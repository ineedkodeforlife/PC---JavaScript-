<script type="text/javascript">
 (function trackTimeEvents() {
  var currentTime = Math.floor(Date.now() / 1000);
  var startTime = localStorage.getItem('startTime');
  var lastEventTime = parseInt(localStorage.getItem('lastEventTime')) || 0;
  
  if (!startTime) {
    startTime = currentTime;
    localStorage.setItem('startTime', startTime);
  }

  var totalTimeSpent = currentTime - startTime;
  var eventTimes = [30, 60, 120, 180];
  
  for (var i = 0; i < eventTimes.length; i++) {
    var eventTime = eventTimes[i];
    
    if (totalTimeSpent >= eventTime && lastEventTime < eventTime) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'timer_' + eventTime + 'sec',
        'totalTimeSpent': totalTimeSpent
      });
      
      localStorage.setItem('lastEventTime', eventTime);
      
      if (eventTime === 180) {
        localStorage.removeItem('startTime');
        localStorage.removeItem('lastEventTime');
        return;
      }
    }
  }

  if (totalTimeSpent < 180) {
    setTimeout(trackTimeEvents, 1000);
  }
})();
</script>
