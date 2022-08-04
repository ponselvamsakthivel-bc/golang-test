import axios from "axios";

export const getMethod= async(url,successCallback,errorCallback)=>{
    try {
      const response = await fetch(url, {mode:'cors'});
      const data = await response.json();
      console.log({ data })
      successCallback(data)
    }
    catch (e) {
      errorCallback(e)

      console.log(e)
    }
}

