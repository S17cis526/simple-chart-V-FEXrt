$(function(){

  var peerReviewCanvas = $('#peer-review')[0];
  var peerReviewCtx = peerReviewCanvas.getContext('2d');

  var pointDistributionCanvas = $('#point-distribution')[0];
  var pointDistributionCtx = pointDistributionCanvas.getContext('2d');

  var colors = [
    'yellow',
    'purple',
    'silver',
    'green',
    'red',
    'blue',
    'orange',
    'fuschia',
    'cyan'
  ]

  peerReviewCtx.fillText("Peer Review", 90, 10);

  for(var i = 0; i < 11; i++) {
    peerReviewCtx.fillText(10 - i, 10, 30 + i*20);
    peerReviewCtx.moveTo(25, 30 + i*20);
    peerReviewCtx.lineTo(90, 30 + i*20)
  }

  peerReviewCtx.stroke();

  // Draw peer review bars
  $.ajax({
    url: '/peerReview.json',
    dataType: 'json',
    success: function(data){
      var categories = Object.keys(data);

      // Draw bars
      categories.forEach(function(category, index){
        var value = data[category];
        var y = 30 + (10 - value) * 20;
        var x = 30 + (10 * index);
        var height = value * 20;

        peerReviewCtx.fillStyle = colors[index];
        peerReviewCtx.fillRect(x, y, 5, height);
        peerReviewCtx.fillRect(100, 80 + 20 * index, 10, 10);
        peerReviewCtx.strokeText(category, 120, 90 + 20 * index);
      })
    }
  })




  // Draw points pie chart
  $.ajax({
    url: '/pointDistribution.json',
    dataType: 'json',
    success: function(data){
      var people = Object.keys(data);
      var total = Object.values(data).reduce(function(acc, value){return acc + value}, 0);

      var angle = 0;
      people.forEach(function(person, index) {
        var percent = data[person] / total
        var theta = percent * 2 * Math.PI;
        pointDistributionCtx.beginPath();
        pointDistributionCtx.arc(100, 100, 80, angle, angle + theta);
        angle += theta;
        pointDistributionCtx.fillStyle = colors[index];
        pointDistributionCtx.fill();
      });
    }
  })

});
