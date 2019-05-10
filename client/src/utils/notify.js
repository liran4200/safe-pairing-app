import {toast} from 'mdbreact';

export const notify = (message,type) => {
    switch(type) {
        case "success":
          toast.success(message);
          break;

        case "error":
          toast.error(message);
          break;
        default:
          break;
    }

}