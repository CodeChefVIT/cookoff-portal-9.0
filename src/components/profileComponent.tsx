'use client'

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { AddImageIconSVG, ProfileBackgroundSVG, ProfileHeaderSVG, ProfileIconSVG } from '../assests/svgPaths';

// Simulated API response object
const profileData = {
    username: "JohnDoe",
    round: "Round 2",
    totalScore: 750,
}

export default function Component() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [profileImage, setProfileImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedImage(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (selectedImage) {
            try {
                const formData = new FormData()
                formData.append('image', selectedImage)

                // Simulated API call
                await new Promise(resolve => setTimeout(resolve, 1000))

                // Simulated successful response
                const imageUrl = URL.createObjectURL(selectedImage)
                setProfileImage(imageUrl)
                setIsModalOpen(false)
            } catch (error) {
                console.error('Error uploading image:', error)
            }
        }
    }

    return (
        <div className="relative w-full max-w-[352px] h-[700px] roboto">
            {/* Background shape with white border */}
            <ProfileBackgroundSVG className="absolute top-0 left-0 w-full" />

            {/* Content container */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Profile header with white border */}
                <div className="w-full relative">
                    <ProfileHeaderSVG className="w-full" />
                    <h1 className="absolute top-2 left-4 text-[#F14A16] text-3xl xl:text-4xl font-normal px-4 xl:px-8 s-sling">
                        PROFILE
                    </h1>
                </div>

                {/* Profile picture placeholder */}
                <div className="mt-8 w-[120px] xl:w-[149px] h-[120px] xl:h-[146px] bg-[#2F2F2F] rounded-full flex items-center justify-center overflow-hidden group">
                    {profileImage ? (
                        <Image
                            src={profileImage}
                            alt="Profile"
                            layout="fill"
                            className="object-cover transition-transform duration-500 ease-in-out group-hover:rotate-360"
                        />
                    ) : (
                        <ProfileIconSVG className="w-3/4 h-3/4 transition-transform duration-500 ease-in-out group-hover:rotate-360" />
                    )}
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 px-3 xl:px-4 py-2 bg-[#2F2F2F] text-white rounded-md flex items-center gap-2 hover:bg-[#3F3F3F] transition-colors duration-200 text-sm xl:text-base"
                >
                    Add Image
                    <AddImageIconSVG className="w-4 h-4 xl:w-5 xl:h-5" />
                </button>

                {/* Input fields */}
                <div className="mt-6 xl:mt-9 w-full space-y-6 xl:space-y-9 px-4">
                    <input
                        type="text"
                        value={profileData.username}
                        readOnly
                        className="w-full h-10 xl:h-12 px-4 bg-[#2F2F2F] text-white rounded-xl text-sm xl:text-base"
                    />
                    <input
                        type="text"
                        value={profileData.round}
                        readOnly
                        className="w-full h-10 xl:h-12 px-4 bg-[#2F2F2F] text-white rounded-xl text-sm xl:text-base"
                    />
                    <input
                        type="text"
                        value={profileData.totalScore}
                        readOnly
                        className="w-full h-10 xl:h-12 px-4 bg-[#2F2F2F] text-white rounded-xl text-sm xl:text-base"
                    />
                </div>
            </div>

            {/* Image Upload Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4 text-black">Upload Profile Image</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="mb-4 w-full"
                                ref={fileInputRef}
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!selectedImage}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Upload
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}