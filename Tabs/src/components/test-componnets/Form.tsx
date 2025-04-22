import { FC, useState } from "react";

// Example form component for a tab
const Form: FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form className="space-y-0.5 border p-3 rounded flex flex-col">
            <label className=" text-md font-semibold" htmlFor="Name">Name</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-3/4 p-1 border rounded"
                placeholder="Name"
            />
            <label className=" text-md font-semibold mt-2" htmlFor="Email">Email</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-3/4 p-1 border rounded"
                placeholder="Email"
            />
        </form>
    );
};
export default Form;