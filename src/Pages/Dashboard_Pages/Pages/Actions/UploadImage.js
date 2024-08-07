import "../SubModels.css";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import ImageTest from "../../../../assets/global/profile.png";
import Swal from "sweetalert2";
import { updateData } from "../../../../axiosConfig/API";

export default function Image({ data }) {
  const { id } = useParams();
  const imageRef = useRef(null);
  const [actionsVisible, setActionsVisible] = useState(false);
  const [categoryImage, setCategoryImage] = useState({
    id: data.id,
    image: null,
    imagePreview: data.image
      ? `http://localhost:8000/storage/${data.image}`
      : ImageTest,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCategoryImage({
        ...categoryImage,
        image: e.target.files[0],
        imagePreview: imageUrl,
      });
      setActionsVisible(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", categoryImage.id);
    if (categoryImage.image) formData.append("image", categoryImage.image);
    formData.append("_method", "put");

    try {
      const response = await updateData(`admin/meals/${id}`, formData, true);

      if (response.status === "success") {
        setActionsVisible(false);
        Swal.fire("Updated!", response.message, "success");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        Swal.fire("Error!", "Validation error occurred.", "error");
      } else {
        Swal.fire("Error!", error.response.data.message, "error");
      }
    }
  };

  const handleRefresh = () => {
    setCategoryImage({
      id: data.id,
      image: null,
      imagePreview: data.image
        ? `http://localhost:8000/storage/${data.image}`
        : ImageTest,
    });
    setActionsVisible(false);
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="SubModel Image">
      <div className="preview" id="preview">
        <img src={categoryImage.imagePreview} alt="preview" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="row"
        encType="multipart/form-data"
      >
        <div className="col">
          <label htmlFor="image" className="btn btn-primary">
            Upload New Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            ref={imageRef}
            onChange={handleImageChange}
          />
        </div>

        {actionsVisible && (
          <>
            <div className="col displayButton">
              <button type="submit" className="btn btn-success">
                <FaCheckCircle />
                <span>Save</span>
              </button>
            </div>

            <div className="col displayButton">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleRefresh}
              >
                <IoMdRefresh />
                <span>Refresh</span>
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}