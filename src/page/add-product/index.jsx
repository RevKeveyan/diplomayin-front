import React, { useEffect, useState } from "react";
import AddProduct from "../../components/add-product";
import useProductService from "../../service/productService";
import { useForm } from "react-hook-form";
import Heading from "../../components/titles";
import ImageinPageSlider from "../../components/prod-components/images-silder";
import ProductDetails from "../../components/prod-components/product-info";
import ProductForm from "../../components/add-product";
import "./style.scss";
const AddPage = () => {
  const { addProduct } = useProductService();



  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [imagePreviews, setImagePreviews] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const selectedCategory = watch("category", "");
  const watchImages = watch("images", []);

  useEffect(() => {
    if (selectedCategory) {
      setValue("subCategory", "");
    }
  }, [selectedCategory, setValue]);

  useEffect(() => {
    if (watchImages && watchImages.length > 0) {
      const files = Array.from(watchImages);
      const previews = files.map((file) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(previews).then((results) => setImagePreviews(results));
    }
  }, [watchImages]);

  const testProd = {
    name: watch("name", "Название товара"),
    subtitle: watch("subtitle", "Краткое описание"),
    description: watch("description", "Описание товара"),
    price: watch("price", ""),
    discount: watch("discount", "0"),
    category: selectedCategory || "Не выбрано",
    subCategory: watch("subCategory", ""),
    stock: watch("stock", "0"),
    quantity: watch("quantity", "1"),
    tags: watch("tags", "").split(","),
    isFeatured: watch("isFeatured", false),
    images: imagePreviews,
  };

  const onSubmit = (data) => {
    addProduct(data);
  };
  return (
    <div className="add-product">
      <ProductForm
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        watch={watch}
        setValue={setValue}
        formState
      />
      {showPreview && testProd.images.length > 0 && (
        <div className="preview-section mt-4">
          <Heading level={2} color="#007bff" align="center">
            Предпросмотр товара
          </Heading>
          <div className="row">
            <div className="col-lg-6">
              <ImageinPageSlider images={testProd.images} />
            </div>
            <div className="col-lg-6">
              <ProductDetails product={testProd} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPage;
