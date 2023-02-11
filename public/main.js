

const form = document.getElementById('vote-form');


form.addEventListener('submit', (e)=> {
       
        const choice = document.querySelector('input[name="os"]:checked').value
        //const mychoice = document.querySelector('input[name=os] :checked');
        const data = { os : choice};
        console.log('The button is working', choice, data);
        fetch('http://localhost:3300/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
    
        e.preventDefault();

        



});


/*
form.addEventListener('submit', ()=> {
    console.log('the button is working');
    const choice = document.querySelector('input[name=os] :checked').value;
    const data = { os : choice};

    fetch('http://localhost:3300/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

    e.preventDefault();

});
*/
fetch('http://localhost:3300/poll').then(res => res.json())
.then(data => {
    const votes = data.votes;
    const totalVotes = votes.length;
    // Count vote points  -acc/current
    const voteCounts = votes.reduce((acc, vote) => (acc[vote.os]=
        ((acc[vote.os] || 0) +  parseInt(vote.points)), acc), {});


        let dataPoints = [
            {label: 'Windows', y: voteCounts.Windows},
            {label: 'MacOS', y: voteCounts.MacOS},
            {label: 'Linux', y: voteCounts.Linux},
        ];
        
        const chartContainer = document.getElementById('chartContainer');
        
        if(chartContainer) {
            console.log('it s working');
            const chart = new CanvasJS.Chart('chartContainer', {
                animationEnabled: true,
                theme: 'theme1',
                title: {
                    text: `Total Votes ${totalVotes}`
                }, 
                data: [
                    {
                        type: 'column',
                        dataPoints: dataPoints
                    }
                ]
            });
        
            chart.render();
        
        
             // Enable pusher logging - don't include this in production
            Pusher.logToConsole = true;
        
            var pusher = new Pusher('5b5b4c11c60f0a9336a8', {
              cluster: 'us2'
            });
        
            var channel = pusher.subscribe('os-poll');
            channel.bind('os-vote', function(data) {
             // alert(JSON.stringify(data));
             dataPoints = dataPoints.map(x => {
                 if(x.label == data.os) {
                     x.y += data.points; 
                     return x;
                 } else {
                     return x;
                    
                 }
             });
             chart.render();
            });
        
        }



        //

})



