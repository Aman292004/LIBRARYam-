import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { storage } from "../firebase";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useAddBookMutation } from "../redux/features/books.Api";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [addBook, { isLoading, isError }] = useAddBookMutation();

  const uploadImage = async (file) => {
    if (!file) return;
    const storageRef = ref(storage, `bookCovers/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const uploadPdf = async (file) => {
    if (!file) return;
    const storageRef = ref(storage, `bookPdfs/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handlePdfChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
      const url = await uploadPdf(file);
      setPdfUrl(url);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const url = await uploadImage(file);
      setImageUrl(url);
    }
  };

  const onSubmit = async (data) => {
    const newBookData = {
      ...data,
      coverImage: imageUrl,
      bookPdf: pdfUrl,
    };

    try {
      await addBook(newBookData).unwrap();
      Swal.fire({
        title: "Book Added",
        text: "Your book has been uploaded successfully!",
        icon: "success",
        confirmButtonColor: "#002366",
      });

      reset();
      setImageFile(null);
      setImageUrl("");
      setPdfFile(null);
      setPdfUrl("");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to add book. Please try again.",
        icon: "error",
        confirmButtonColor: "#002366",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mt-5 mb-10">
      <h2 className="text-4xl font-bold text-center text-[#002366] mb-8">
        Add New Book
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
            {errors.title && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.title.message}
              </p>
            )}
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
            {errors.author && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.author.message}
              </p>
            )}
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
          {errors.description && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.description.message}
            </p>
          )}
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
            {errors.category && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.category.message}
              </p>
            )}
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
            {errors.oldPrice && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.oldPrice.message}
              </p>
            )}
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
            {errors.newPrice && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.newPrice.message}
              </p>
            )}
          </div>
        </div>

        {/* File Upload - Cover Image & PDF */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block font-medium text-[#002366] mb-2">
              Upload Cover Image
            </label>

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
              <FaCloudUploadAlt className="text-3xl text-gray-500 mx-auto" />
              <p className="text-gray-600 mt-2">Click to upload cover image</p>
              {imageUrl && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600">Selected: {imageUrl}</p>
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Preview"
                    className="mt-2 w-32 h-40 object-cover border rounded-md"
                  />
                </div>
              )}
            </label>
          </div>

          <div>
            <label className="block font-medium text-[#002366] mb-2">
              Upload Book PDF
            </label>

            <label
              htmlFor="pdf-upload"
              className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer hover:bg-gray-100 transition block"
            >
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                onChange={handlePdfChange}
                className="hidden"
              />
              <FaCloudUploadAlt className="text-3xl text-gray-500 mx-auto" />
              <p className="text-gray-600 mt-2">Click to upload book PDF</p>
              {pdfUrl && (
                <p className="text-sm text-gray-600 mt-2">Uploaded: {pdfUrl}</p>
              )}
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 p-3 font-bold rounded-lg transition duration-300 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#002366] hover:bg-[#001a4d] text-white"
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 border-t-4 border-white rounded-full"
                viewBox="0 0 24 24"
              ></svg>
              Adding...
            </>
          ) : (
            <>
              <FaCloudUploadAlt className="text-lg" />
              Add Book
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
