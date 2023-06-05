import Swal from 'sweetalert2'

class ALERT {
    constructor(){

    }

    successAlert(value:any){
        console.log(value)
        return (
            Swal.fire({  
                title: value.message,  
                text: value.text,
                icon: 'success'
                
              })
              
        )
      
    }

    errorAlert(value:any){
        return (
            Swal.fire({  
                title: value.message,  
                text: value.text,
                icon: 'error'
              })
        )
    }

    questionAlert(value:any){
        return (
            Swal.fire({  
                title: value.message,  
                text: value.text,
                icon: 'success'
              })
        )
    }



}

export default ALERT