"use client"
import { submitLocation } from '@/lib/action';
import React, { useEffect, useState } from 'react'
import Select from 'react-select';

const NewLocationForm = ({ latitude, longitude }) => {
    const [placeName, setPlaceName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [img, setImg] = useState("");

    let categoryOptions = [
        { value: 'Mystery', label: 'Mystery' },
        { value: 'Scenic', label: 'Scenic' },
        { value: 'Shopping', label: 'Shopping' },
        { value: 'Sports', label: 'Sports' },
        { value: 'Entertainment', label: 'Entertainment' }
    ]



    useEffect(() => {
        const fetchAddress = async () => {
            const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
            try {
                const response = await fetch(url);
                const formatRes = await response.json();
                let locationAddress = formatRes.results[0].formatted_address;
                setLocation(locationAddress);
            } catch (error) {
                console.error("Error fetching location: ", error);
            }
        };

        fetchAddress();
    }, [latitude, longitude]);


    const handleSubmit = (e) => {
        e.preventDefault()


        // find the address from the lat and lon

        const data = {
            created_by: "spikeman",
            categories: ["Scenic"],
            place_name: placeName,
            address: location,
            latitude: Number(latitude),
            longitude: Number(longitude),
            description,
            img: img || "https://cdn.pixabay.com/photo/2019/09/22/16/20/location-4496459_1280.png",
            rating: 0,
        }

        try {
            submitLocation(data)
            setPlaceName("")
            setLocation("")
            setDescription("")
            setCategories([])
            setImg("")
        } catch {
            throw new Error("Could not add new location")
        }
    }

    const handleCategoryChange = (selectedOption) => {
        const selectedCategories = selectedOption.map((option) => {
            return option.value
        })
        setCategories(selectedCategories)
    }

    //convert to base64 Strings, allows upload of small images
    const handleFileChange = (e) => {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setImg(reader.result)
        }
        reader.onerror = error => {
            console.log("Error: ", error)
        }
    }

    return (
        <div>
            <div className="card bg-base-100 shadow-xl w-5/6 bg-indigo-500 mx-auto ">
                <figure>{img && <img className='w-full h-full object-cover' src={img} />}</figure>
                <div className="card-body">
                    <h2 className="card-title text-2xl">New gem</h2>
                        <form onSubmit={handleSubmit}>
                            
                            <div className='flex flex-col gap-2'>

                                <div className='flex flex-col lg:flex-row gap-5 '>
                                    <div className='join join-vertical w-full'>
                                        <label htmlFor="place-name" className='bg-indigo-300 w-full  join-item p-2'>Place name:</label>
                                        <input value={placeName} onChange={e => setPlaceName(e.target.value)} type="text" id="place-name" placeholder="Leadenhall Market" className="input input-bordered w-full  rounded-t-none "/><br />
                                    </div>

                                    <div className='join join-vertical w-full'>
                                        <label htmlFor="location" className='bg-indigo-300 w-full  join-item p-2'>Location:</label>
                                        <input value={location} onChange={e => setLocation(e.target.value)} type="text" id="location" placeholder="London" className="input input-bordered w-full  rounded-t-none"/><br />
                                    </div>
                                </div>


                                <div className='join join-vertical'>
                                    <p className='bg-indigo-300 join-item p-2'>Categories:</p>

                                    <div className="card bg-base-100 shadow-xl join-item p-2">
                                            <Select
                                                isMulti
                                                name="categories"
                                                options={categoryOptions}
                                                onChange={handleCategoryChange}
                                                classNamePrefix="select"
                                            />    
                                    </div>

                                </div>

                                <div className='join join-vertical'>
                                    <label htmlFor="description" className='bg-indigo-300 join-item p-2'>Description:</label>
                                    <textarea value={description} onChange={e => setDescription(e.target.value)} id="description" placeholder="A beautiful covered market in the historic center of London" className="textarea w-full rounded-t-none"></textarea><br />
                                </div>

                                <div className='join join-vertical'>
                                    <label htmlFor="image" className='bg-indigo-300 join-item p-2'>Upload an image:</label>
                                    <input type="file" id="image" name="image" accept='image/*' onChange={handleFileChange} className="file-input max-w-x rounded-t-none"/><br />
                                </div>
                            </div>
                            
                            <div className="card-actions justify-end">
                                <button type='submit' className="btn btn-primary ">Add new location</button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    )
}

export default NewLocationForm