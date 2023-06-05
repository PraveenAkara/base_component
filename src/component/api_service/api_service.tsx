import axios from 'axios';
import { userRequest, tokenExpiry } from './Authendication'

class API {

    constructor() {
    }


    login = async (values:any) => {
        try {
            const res = await userRequest.post("login",values)
            return res
        } catch (err) {
            console.log(err);
        }
    };


    // tokenRefresh = async () => {

    //     try {
    //         const res = tokenExpiry.post("refresh").then((res) => {
    //             if (res.data.meta.error === 0) {
    //                 localStorage.setItem("auth", res.data.meta.access_token)
    //                 localStorage.setItem("refresh", res.data.meta.refresh_token)
    //                 window.location.reload(true)
    //             }
    //         })

    //     } catch (err) {
    //         console.log(err)
    //     }

    // };

    getState = async (page:any,per_page:any) => {
        try {
            const res = await userRequest.get("getState",{params:{page,per_page}})
            return res
        } catch (e) {
            // if (e.response.data.msg === "Token has expired") {
            //     this.tokenRefresh()
            // }
        }

    };


    // SaveState = async (data) => {

    //     try {
    //         const res = userRequest.post("saveState", data)
    //         return res
    //     } catch (err) {
    //         console.log(err)
    //     }

    // };

    // getDistrict = async (page,per_page) => {
        
    //     try {
    //         const res = userRequest.get("getDistrict",{params:{page,per_page}})
    //         return res
    //     } catch (err) {
    //         console.log(err)
    //     }

    // };

    // SaveDistrict = async (data) => {

    //     try {
    //         const res = userRequest.post("saveDistrict", data)
    //         return res
    //     } catch (err) {
    //         console.log(err)


    //     };
    // }

    // upload = async (data) => {

    //     try {
    //         const res = userRequest.post("upload", data)
    //         return res
    //     } catch (err) {
    //         console.log(err)


    //     };
    // }
}
export default API;