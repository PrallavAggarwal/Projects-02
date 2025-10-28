import { useContext, useState, type ChangeEvent } from "react"
import { districtData } from "../assets/districts";
import { AppContext } from "../context/AppContext";

interface AppContextType {
  states: string;
  setStates: (value: string) => void;
  district: string;
  setDistrict: (value: string) => void;
}


export function FiltersBar() {

  const { setDistrict, setStates, states } = useContext(AppContext)

  function selectState(e: ChangeEvent<HTMLSelectElement>) {
    console.log('event.target : ', e.target)
    console.log('event.target.value : ', e.target.value)
    setStates(() => e.target.value)
    console.log('state : ', states)
  }

  function selectDistrict(e: ChangeEvent<HTMLSelectElement>) {
    setDistrict(() => e.target.value)
  }

  let districtArray: string[] = []

  districtData.states.forEach((elem) => {
    if (elem.state == states) {
      districtArray = elem.districts;
    }
  })

  console.log('districtData : ', districtArray)
  return (
    <div className=" flex my-10 overflow-scroll">

      <form className="flex gap-2">
        <select className='border-2 border-[#0066CE] px-5 rounded-2xl text-[#0066CE] drop-shadow-2xl' id="states" onChange={(e) => selectState(e)}>
          <option defaultValue={'State'}>--State--</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Bihar">Bihar</option>
          <option value="Chandigarh">Chandigarh</option>
          <option value="Goa">Goa</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Haryana">Haryana</option>
          <option value="Himachal Pradesh">Himachal Pradesh</option>
          <option value="Jammu and Kashmir">Jammu and Kashmir</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Kerala">Kerala</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Manipur">Manipur</option>
          <option value="Meghalaya">Meghalaya</option>
          <option value="Nagaland">Nagaland</option>
          <option value="Odisha">Odisha</option>
          <option value="Punjab">Punjab</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Telangana">Telangana</option>
          <option value="Tripura">Tripura</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Uttrakhand">Uttrakhand</option>
          <option value="West Bengal">West Bengal</option>
        </select>

        <select className='border-2 border-[#0066CE] px-5 rounded-2xl text-[#0066CE] ' onChange={(e) => selectDistrict(e)}>
          <option selected>--District--</option>
          {
            districtArray && districtArray.map((elem: string) => {
              return (
                <>
                  <option value={elem}>{elem}</option>
                </>
              )
            })
          }
        </select>

      </form >

    </div>
  )
}
