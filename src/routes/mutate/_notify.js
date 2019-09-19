import { notice } from '../../store/stores';
import { goto } from '@sapper/app';
let message; 

export function notify (response, route) {
    if (!response.status) {
  // console.log('Login Ok.' );
      message = 'Record created !! ';
      const displayTimeMs = 8000;
      // notifications.success(message, displayTimeMs);
    //   visible = false;
      notice.set({message: message, status: "success"});
       goto(route); 
} else{
          message = 'Looks like there was a problem. Status:  ' +
        response.statusText;
  const displayTimeMs = 7000
          notice.set({message: message, status: "danger"});

  // notifications.danger(message, displayTimeMs)
}
}