import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import {
  useFetchBookByIdQuery,
  useUpdateBookMutation,
} from "../redux/features/books.Api";
import { storage } from "../firebase";
import getBaseUrl from "../utils/baseURl";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UpdateBook = () => {
  const { id } = useParams();
  const {
    data: bookData,
    isLoading,
    isError,
    refetch,
  } = useFetchBookByIdQuery(id);
  const [updateBook] = useUpdateBookMutation();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (bookData) {
      setValue("title", bookData.title);
      setValue("author", bookData.author);
      setValue("description", bookData.description);
      setValue("category", bookData.category);
      setValue("trending", bookData.trending);
      setValue("oldPrice", bookData.oldPrice);
      setValue("newPrice", bookData.newPrice);
      setValue("coverImage", bookData.coverImage);
      setImageUrl(bookData.coverImage);
    }
  }, [bookData, setValue]);

  const uploadImage = async (file) => {
    if (!file) return null;
    setIsUploading(true);
    try {
      const storageRef = ref(storage, `bookCovers/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setIsUploading(false);
      return url;
    } catch (error) {
      console.error("Firebase Upload Error:", error);
      setIsUploading(false);
      return null;
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) {
      setImageUrl(url);
      setValue("coverImage", url);
    }
  };

  const onSubmit = async (data) => {
    const updatedBookData = {
      title: data.title,
      author: data.author,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: imageUrl || bookData.coverImage,
    };

    try {
      await axios.put(
        `${getBaseUrl()}/api/books/update/${id}`,
        updatedBookData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        title: "Book Updated",
        text: "Your book is updated successfully!",
        icon: "success",
        confirmButtonColor: "#002366",
      });
      await refetch();
    } catch (error) {
      Swal.fire({
        title: "Update Failed",
        text: "Failed to update book. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching book data</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mt-5 mb-10">
      <h2 className="text-4xl font-bold text-center text-[#002366] mb-8">
        Update Book
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        {/* Title & Author */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block font-medium text-[#002366] mb-2">
              Book Title
            </label>
            <input
              type="text"
              placeholder="Enter book title"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#002366] focus:outline-none transition"
              {...register("title")}
            />
          </div>

          <div>
            <label className="block font-medium text-[#002366] mb-2">
              Author Name
            </label>
            <input
              type="text"
              placeholder="Enter author name"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#002366] focus:outline-none transition"
              {...register("author")}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-[#002366] mb-2">
            Description
          </label>
          <textarea
            placeholder="Enter book description"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#002366] focus:outline-none transition"
            {...register("description")}
          />
        </div>

        {/* Category & Trending */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block font-medium text-[#002366] mb-2">
              Category
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#002366] focus:outline-none transition"
              {...register("category")}
            >
              <option value="">Choose A Category</option>
              <option value="business">Business</option>
              <option value="technology">Technology</option>
              <option value="fiction">Fiction</option>
              <option value="horror">Horror</option>
              <option value="adventure">Adventure</option>
            </select>
          </div>

          {/* Trending Toggle */}
          <div>
            <span className="block font-medium text-[#002366] mb-2">
              Trending
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register("trending")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:ring-[#FFD700] peer-focus:ring-2 rounded-full peer peer-checked:bg-[#002366] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5 peer-checked:after:border-white"></div>
            </label>
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block font-medium text-[#002366] mb-2">
              Old Price
            </label>
            <input
              type="number"
              placeholder="Enter old price"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#002366] focus:outline-none transition"
              {...register("oldPrice")}
            />
          </div>

          <div>
            <label className="block font-medium text-[#002366] mb-2">
              New Price
            </label>
            <input
              type="number"
              placeholder="Enter new price"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#002366] focus:outline-none transition"
              {...register("newPrice")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block font-medium text-[#002366] mb-2">
              Upload Cover Image
            </label>

            {/* Upload Area */}
            <label
              htmlFor="cover-upload"
              className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer hover:bg-gray-100 transition block"
            >
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Cover Preview"
                  className="w-32 h-44 object-cover rounded-md mx-auto shadow-md"
                />
              ) : (
                <>
                  <FaCloudUploadAlt className="text-3xl text-gray-500 mx-auto" />
                  <p className="text-gray-600 mt-2">
                    Click to upload cover image
                  </p>
                </>
              )}
            </label>

            {/* Hidden Input for Form Submission */}
            <input type="hidden" {...register("coverImage")} value={imageUrl} />
          </div>
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className={`w-full flex items-center justify-center gap-2 p-3 font-bold rounded-lg transition duration-300 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#002366] hover:bg-[#001a4d] text-white"
          }`}
        >
          {isUploading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 border-t-4 border-white rounded-full"
                viewBox="0 0 24 24"
              ></svg>
              Uploading...
            </>
          ) : (
            <>
              <FaCloudUploadAlt className="text-lg" />
              Update Book
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
