document.getElementById("enable-notifications").onclick = askNotificationPermission;

if(Notification.permission === 'denied' || Notification.permission === 'default') {
  document.getElementById("enable-notifications").style.display = 'block';
} else {
  document.getElementById("enable-notifications").style.display = 'none';
}

function askNotificationPermission() {
  // function to actually ask the permissions
  console.log("hey!");
  function handlePermission(permission) {
    // Whatever the user answers, we make sure Chrome stores the information
    if(!('permission' in Notification)) {
      Notification.permission = permission;
    }

    // set the button to shown or hidden, depending on what the user answers
    if(Notification.permission === 'denied' || Notification.permission === 'default') {
      document.getElementById("enable-notifications").style.display = 'block';
    } else {
      document.getElementById("enable-notifications").style.display = 'none';
    }
  }

  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    console.log("This browser does not support notifications.");
  } else {
    if(checkNotificationPromise()) {
      Notification.requestPermission()
        .then((permission) => {
          handlePermission(permission);
        })
    } else {
      Notification.requestPermission(function(permission) {
        handlePermission(permission);
      });
    }
  }
}

function showOrNot(){
}

function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch(e) {
    return false;
  }

  return true;
}
