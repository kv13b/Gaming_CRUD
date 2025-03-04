import { useState } from "react";
import axiosinstance from "../../utils/axiosinstance";
import { ToastContainer, toast } from "react-toastify";
import "./ClientMaster.css";
const ClientMaster = () => {
  const [FormData, setFormData] = useState({
    Name: "",
    Address: "",
    ContactNo: "",
    Email: "",
    UserId: "", // remove this from input
  });
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh
    try {
      const response = await axiosinstance.post("master/client", FormData);

      if (response.status === 200) {
        toast("Client insertion successful");
        setFormData({
          Name: "",
          Address: "",
          ContactNo: "",
          Email: "",
          UserId: "",
        });
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast("Error inserting client data");
    }
  };
  return (
    <div>
      <h2>Client Master</h2>
      <ToastContainer />
      <form className="formdata" onSubmit={handleSubmit}>
        <label className="labeldata">
          Name:
          <input
            type="text"
            name="Name"
            value={FormData.Name}
            onChange={handleChange}
            required
          />
        </label>

        <label className="labeldata">
          Address:
          <input
            type="text"
            name="Address"
            value={FormData.Address}
            onChange={handleChange}
            required
          />
        </label>

        <label className="labeldata">
          Contact No:
          <input
            type="text"
            name="ContactNo"
            value={FormData.ContactNo}
            onChange={handleChange}
            required
          />
        </label>

        <label className="labeldata">
          Email:
          <input
            type="email"
            name="Email"
            value={FormData.Email}
            onChange={handleChange}
            required
          />
        </label>

        <label className="labeldata">
          User ID:
          <input
            type="text"
            name="UserId"
            value={FormData.UserId}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Save Client</button>
      </form>
    </div>
  );
};

export default ClientMaster;
