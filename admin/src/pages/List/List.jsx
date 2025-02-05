import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.date || []); // "data" o'rniga "date" ishlatiladi
       
      } else {
        toast.error("Ma'lumot olishda xato.");
      }
    } catch (error) {
      toast.error("Tarmoq xatosi.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  const removeFood = async (foodID) => {
    try {
        console.log("Food ID to delete:", foodID); // O'chiriladigan ID ni ko'ring
        const response = await axios.post(`${url}/api/food/remove`, { id: foodID });
        console.log("Response from server:", response); // Serverdan kelgan javobni ko'ring
        if (response.data.success) {
            await fetchList(); // Ma'lumotlarni yangilash
            toast.success("ochirldi")
        } else {
            toast.error("O'chirishda xato.");
        }
    } catch (error) {
        console.error("O'chirish xatosi:", error);
        toast.error("Tarmoq xatosi.");
    }
};
   
  return (
    <div className="list add flex-col">
      <p>ALL food list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {Array.isArray(list) && list.length > 0 ? (
          list.map((item, index) => {
            return (
              <div key={index} className="list-table-format">
                <img src={`${url}/images/` + item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p className="cursor" onClick={()=>removeFood(item._id)}>X</p>
              </div>
            );
          })
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default List;
