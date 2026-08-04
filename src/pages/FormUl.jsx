import React, { useState } from "react";

const FormUl = ({
  productOparation,
  product,
  setProduct,
  submitHandler,
  loading,
  image,
  setImage,
}) => {
  const [imgPreview, setImgPreview] = useState("");
  // function formatToDisplay(dateStr) {
  //   let parts = dateStr.split("-");
  //   return `${parts[2]}-${parts[1]}-${parts[0].slice(2)}`;
  // }
  // console.log("FormUl product:", product);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const normalizedValue =
      type === "checkbox"
        ? checked
        : name === "price"
          ? value === ""
            ? ""
            : Number(value)
          : name === "quantity"
            ? value === ""
              ? ""
              : Number(value)
            : value;

    setProduct((prev) => ({
      ...prev,
      [name]: normalizedValue,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setImage(file || null);
    setImgPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_25px_80px_-25px_rgba(15,23,42,0.35)]">
          <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 px-8 py-8 text-white sm:px-10">
            <h1 className="text-3xl font-semibold">{productOparation}</h1>
            <p className="mt-2 text-indigo-100">
              Fill in the product details below
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6 p-8 sm:p-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={product.brand}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  placeholder="Enter brand name"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Description
              </label>
              <textarea
                name="description"
                value={product.description ?? product.desc ?? ""}
                onChange={handleInputChange}
                rows={4}
                required
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                placeholder="Enter product description"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  placeholder="e.g. 999.99"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Category
                </label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                >
                  <option value="">Select category</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Headphone">Headphone</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Toys">Toys</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Camera">Camera</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={handleInputChange}
                  min="0"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  placeholder="Available stock"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Release Date
                </label>
                <input
                  type="date"
                  name="releaseDate"
                  value={product.releaseDate}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {productOparation === "Update The Product" ? (
                <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  {imgPreview ? (
                    <img
                      src={imgPreview}
                      className="h-40 w-full rounded-2xl object-cover"
                    />
                  ) : (
                    <img
                      src={image}
                      className="h-40 w-full rounded-2xl object-cover"
                    />
                  )}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Change The Image
                    </label>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-indigo-700"
                    />
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Product Image
                  </label>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-indigo-700"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <input
                type="checkbox"
                id="available"
                name="available"
                checked={product.available}
                onChange={handleInputChange}
                className="h-5 w-5 rounded border-slate-300 text-indigo-600"
              />
              <label
                htmlFor="available"
                className="text-sm font-medium text-slate-700"
              >
                Product Available
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:from-indigo-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
            >
              {loading ? "Adding Product..." : "Submit Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormUl;
