const express = require('express');
const router = express();
const isAuth = require('./middleware/auth');
const userExpenses = require('../models/Expense');
const userIncome = require('../models/Income');
const userAccount = require('../models/Accounts');
const userTrans = require('../models/Transactions');
const { isValidObjectId, Mongoose } = require('mongoose');
const mongoose = require('mongoose');

// middleware 
router.all('/*', (req, res, next)=> {
    req.app.locals.layout ='home';
    next();
});



router.get('/', isAuth, async(req, res)=>{
    //

    try {


      //
    //console.log(req.session.userEmail);
    const ExpCount = await userExpenses.count({U_ID: req.session.userEmail});
    const incCount = await userIncome.count({U_ID: req.session.userEmail});
    const accCount = await userAccount.count({U_ID: req.session.userEmail});
    const transCount = await userTrans.count({TransID: req.session.userEmail});
    
    // Monthly Expense chart
    monthlyChartExpens = await chartExp(req.session.userEmail); 
    var MonthExpLabel = mapingName(monthlyChartExpens);
    var MonthExpTotal = mapingMonths(monthlyChartExpens);


    // Monthly Income chart
    monthlyChartIncome = await chartInc(req.session.userEmail);
    var MonthIncLabel = mapingName(monthlyChartIncome);
    var MonthIncTotal = mapingMonths(monthlyChartIncome);

    // Expense Category
    ExpCategory = await chartCategory(req.session.userEmail);
    var CategoryLabel = mapingName(ExpCategory);
    var Total = mapingMonths(ExpCategory);
    //console.log(CategoryLabel, Total);
    
     // Expense Daily
     ExpDaily = await chartExpDaily(req.session.userEmail);
     var ExpDailyLabel = mapingName(ExpDaily);
     var EachTotal = mapingMonths(ExpDaily);
     var months = mapingMonth(ExpDailyLabel);
     var dayName = mapingDayName(ExpDailyLabel);
     var days = mapingDays(ExpDailyLabel);

     /*
     for(var i = 0;  i <= months.length -1; i++) {
      if(months[i] == 1) {
   months[i] = 'January';
     } else if (months[i] == 2) {
   months[i] = 'Febuary';
     } else if (months[i] == 3) {
   months[i] = 'March';
     } else if (months[i] == 4) {
   months[i] = 'April';
     } else if (months[i] == 5) {
   months[i] = 'May';
     } else if (months[i] == 6) {
   months[i] = 'June';
     } else if (months[i] == 7) {
   months[i] = 'July';
     } else if (months[i] == 8) {
   months[i] = 'August';
     } else if (months[i] == 9) {
   months[i] = 'September';
     } else if (months[i] == 10) {
   months[i] = 'October';
     } else if (months[i] == 11) {
   months[i] = 'November';
     } else if (months[i] == 12) {
   months[i] = 'December';
 }
   console.log(months[i]);
 
}
*/
     
     //console.log(ExpDailyLabel, EachTotal, months, dayName, days);
     console.log(CategoryLabel);
    
  
  
    
     

  

    
    res.render('home/dashborad', {ExpCount: ExpCount,
                                  incCount: incCount,
                                   accCount:accCount,
                                   transCount:transCount,
                                  //Monthly Expneses chart data
                                  ExpMonth: MonthExpLabel,
                                  ExpMonthData: JSON.stringify(MonthExpTotal),
                                  //Monthly income chart data
                                  IncMonth: MonthExpLabel,
                                  IncMonthData: JSON.stringify(MonthIncTotal),
                                  //Each category Expenses chart data
                                  cateLabel: CategoryLabel,
                                  CategoryData: JSON.stringify(Total),
                                  //Daily Expenses chart data
                                  dailyExpMonth: months,
                                  dailydays: days,
                                  dailyExpData: JSON.stringify(EachTotal)
                                });

    } catch(err) {
      console.log(err);
    }
    


    
});


module.exports = router;


async function chartExp(userEmail){

  console.log('here is the ID: ', userEmail);
  const pipeline = [
      
        {
          '$match': {
            'U_ID': userEmail
          }
        }, {
        '$group': {
          '_id': {
            '$month': '$Date'
          }, 
          'total': {
            '$sum': '$Amount'
          }
        }
      }, {
        '$sort': {
          '_id': 1
        }
      }
    
        
    ]

    const monthlyExp = await userExpenses.aggregate(pipeline);
    return monthlyExp;

}; 

async function chartInc(userEmail){

  console.log('here is the ID: ', userEmail);
  const pipeline = [
      
        {
          '$match': {
            'U_ID': userEmail
          }
        }, {
        '$group': {
          '_id': {
            '$month': '$Date'
          }, 
          'total': {
            '$sum': '$Amount'
          }
        }
      }, {
        '$sort': {
          '_id': 1
        }
      }
    
        
    ]

    const monthlyInc = await userIncome.aggregate(pipeline);
    return monthlyInc;

}; 


async function chartCategory(userEmail){

  console.log('here is the ID: ', userEmail);
  const pipeline = [
    {
      '$match': {
        'U_ID': userEmail
      }
    }, {
      '$group': {
        '_id': '$Category', 
        'total': {
          '$sum': '$Amount'
        }
      }
    }
  ]

    const ExpCategory = await userExpenses.aggregate(pipeline);
    return ExpCategory;

}; 

async function chartExpDaily(userEmail){

  const pipeline = [
      {
        '$match': {
          'U_ID': 'Hasoomi@gmail.com'
        }
      }, {
        '$group': {
          '_id': {
            'days': {
              '$dayOfMonth': '$Date'
            }, 
            'daysname': {
              '$dayOfWeek': '$Date'
            }, 
            'month': {
              '$month': '$Date'
            }
          }, 
          'total': {
            '$sum': '$Amount'
          }
        }
      }, {
        '$sort': {
          '_id.month': 1, 
          '_id.days': 1
        }
      }
    ]

    const ExpDaily = await userExpenses.aggregate(pipeline);
    return ExpDaily;

}; 


function mapingName(names) {
  var label = names.map(function(elem) {
    return elem._id
  });
  return label;
};

function mapingMonths(months) {
  var data = months.map(function(elem) {
    return elem.total
  });
  return data;
};

function mapingMonth(month) {
  var data = month.map(function(elem) {
    return elem.month
  });
  return data;
};

function mapingDayName(Dayname) {
  var data = Dayname.map(function(elem) {
    return elem.daysname
  });
  return data;
};

function mapingDays(Day) {
  var data = Day.map(function(elem) {
    return elem.days
  });
  return data;
};
