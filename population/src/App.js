import React, {
  useEffect,useState
 
} from 'react'
import './styles/App.css';
import logo from './img/taipei-city-logo.png'
import BarChart from './component/BarChart'
import {
  API_HOST
} from './config'
import axios from 'axios'
import Spinner from './component/Spinner'
function App() {
  const [districtOpt, setDistrictOpt] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSet, setDataSet] = useState({
    labels: ["共同生活戶", "單獨生活戶"],
    datasets: [{
        label: '女性',
        data: [0,0],
        backgroundColor: "#DF7B7B",
      },
      {
        label: '男性',
        data: [0, 0],
        backgroundColor: "#478CD1",
      },
    ],
  });
  useEffect(()=>{
   (async () => {
     let rawdata = await axios.get(`${API_HOST}`)
    //  console.log(rawdata.data)
    const tpeDistData = rawdata.data
     let r = tpeDistData.filter((v) => {
       return v.site_id.slice(0, 3) === "臺北市";
    })
    // console.log(r)
    let set = new Set();
    const result = r.filter(v => {
      return !set.has(v.site_id) ? set.add(v.site_id) : false
    })
    setDistrictOpt(result)
    
     })()
     setTimeout(() => {
       setIsLoading(false)
     }, 8000)
  },[])
  

 const loadDistrictData=async(e)=>{
 const dist = document.getElementById('tpedist');
 let fosum = 0;
 let mosum = 0;
 let fssum = 0;
 let mssum = 0;
 if(dist.value === e.target.value){
        let rawData = await axios.get(`${API_HOST}`)
        const allTpeDistData = rawData.data
        const j = allTpeDistData.filter((v) => {
        return v.site_id === e.target.value;
        })
      
        for (let i of j) {    
          fosum += (i.household_ordinary_f - 0);
          mosum += (i.household_ordinary_m - 0);
          fssum += (i.household_single_f - 0);
          mssum += (i.household_single_m - 0);
        }            
 }
 setDataSet({
   labels: ["共同生活戶", "單獨生活戶"],
   datasets: [{
       label: '女性',
       data: [fosum, fssum],
       backgroundColor: "#DF7B7B",
     },
     {
       label: '男性',
       data: [mosum, mssum],
       backgroundColor: "#478CD1",
     },
   ],
 })
  
 }
 
 const setDataBack = ()=>{
   setDataSet({
     labels: ["共同生活戶", "單獨生活戶"],
     datasets: [{
         label: '女性',
         data: [0, 0],
         backgroundColor: "#DF7B7B",
       },
       {
         label: '男性',
         data: [0, 0],
         backgroundColor: "#478CD1",
       },
     ],
   })

 }

return (
    <>

      <div className="container">
      
   <div className="tpgov_logo mb-3 mt-4 mx-auto">
   <img src={logo} alt=""></img>
  </div> 
  <p className="title mb-5">108年台北市各區戶數資料</p>
  
 <div className={isLoading? 'mySpinner d-flex' : 'mySpinner d-none'}><Spinner />資料載入中，請稍候</div>
  <div className={
    isLoading ? 'd-flex align-center justify-content-evenly mb-3 opacity0' : 'd-flex align-center mb-3 opacity1'
  }
  >
 <div className="district"></div>
    <p className="test">
      行政區
    </p>
     <div className="space"></div>
    <div>
      <select name = ""
      id = "tpedist"
      onChange = {
        (e)=>{loadDistrictData(e)
       }
      }
      onClick={()=>{setDataBack()}}>
        <option>請選擇</option>
   {  
   districtOpt.length !== 0 ? (districtOpt.map((district,key)=>{
       return(
           <option key={key}>{district.site_id}</option>
       )
     })):(<></>)    
   }
      </select>
    </div>
  </div>
 <div className="row">
   <BarChart
     dataSet = {
       dataSet
     }
   />
 </div>
</div>
    </>
  );

  }
export default App
