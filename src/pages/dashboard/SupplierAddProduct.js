import React from "react";
import {
    DndContext,
    closestCenter,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import "./SupplierAddProduct.scss";
import SortableItem from "../../components/SortableItem";
import FlashMessageContainer, { FlashMessage } from "../../components/FlashMessage";

const COUNTRIES = [
    "Türkiye",
    "Germany",
    "UAE",
    "France",
    "USA",
    "Canada",
    "Italy",
    "Spain",
    // add more...
];

export default class SupplierAddProduct extends React.Component {
    state = {
        productName: "",
        shortDesc: "",
        longDesc: "",
        videoLink: "",
        category: "",
        certifications: "",
        deliverableCountries: [], // now an array of selected countries
        countryInput: "",         // temporary input for autocomplete/select
        ranges: [{ qty: "", price: "" }],
        images: [],
        featuredImageId: null,
        isDraggingOver: false,
    };



    // ---------- Image Upload ----------
    handleFiles = (files) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        const minSize = 400; // minimum width/height

        Array.from(files).forEach((file) => {
            if (!allowedTypes.includes(file.type)) {
                FlashMessage.show("danger", `${file.name} is not a supported file type.`);
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    if (img.width < minSize || img.height < minSize) {
                        FlashMessage.show("danger", `${file.name} is too small. Minimum size is ${minSize}x${minSize}px.`);
                        return;
                    }

                    if (Math.abs(img.width - img.height) > 5) {
                        FlashMessage.show("danger", `${file.name} is not square. Please upload a square image.`);
                        return;
                    }

                    // Valid image, add to state
                    this.setState((prev) => ({
                        images: [
                            ...prev.images,
                            { id: Date.now() + Math.random(), url: e.target.result, file },
                        ],
                    }));
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    };


    handleDragOver = (e) => {
        e.preventDefault();
        this.setState({ isDraggingOver: true });
    };

    handleDragLeave = () => {
        this.setState({ isDraggingOver: false });
    };

    handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) this.handleFiles(files);
        this.setState({ isDraggingOver: false });
    };

    handleInputChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) this.handleFiles(files);
    };

    handleImageReorder = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        this.setState((prev) => {
            const oldIndex = prev.images.findIndex((img) => img.id === active.id);
            const newIndex = prev.images.findIndex((img) => img.id === over.id);
            return { images: arrayMove(prev.images, oldIndex, newIndex) };
        });
    };

    removeImage = (id) => {
        debugger
        this.setState((prev) => ({
            images: prev.images.filter((img) => img.id !== id),
        }));
    };

    setFeaturedImage = (id) => {
        this.setState({ featuredImageId: id });
    };

    // ---------- Quantity Ranges ----------
    handleRangeChange = (index, field, value) => {
        this.setState((prev) => {
            const ranges = [...prev.ranges];
            ranges[index][field] = value;
            return { ranges };
        });
    };

    addRange = () => {
        this.setState((prev) => ({
            ranges: [...prev.ranges, { qty: "", price: "" }],
        }));
    };

    removeRange = (index) => {
        this.setState((prev) => {
            const ranges = [...prev.ranges];
            ranges.splice(index, 1);
            return { ranges };
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting:", this.state);
    };

    render() {
        const {
            productName,
            shortDesc,
            longDesc,
            videoLink,
            category,
            certifications,
            deliverableCountries,
            ranges,
            images,
            featuredImageId,
            isDraggingOver,
        } = this.state;

        return (
            <div className="add-product">
                <form onSubmit={this.handleSubmit}>

                    {/* IMAGES */}
                    <div className="form-group">
                        <label>Product Images</label>
                        <div
                            className={`image-upload-zone ${isDraggingOver ? "drag-over" : ""}`}
                            onDragOver={this.handleDragOver}
                            onDragLeave={this.handleDragLeave}
                            onDrop={this.handleDrop}
                            onClick={() => this.fileInput.click()}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                ref={(ref) => (this.fileInput = ref)}
                                onChange={this.handleInputChange}
                                style={{ display: "none" }}
                            />

                            <div className="upload-text">
                                <strong>Drag & drop</strong> images here, or <u>click to browse</u>
                            </div>

                            {images.length > 0 && (
                                <DndContext
                                    collisionDetection={closestCenter}
                                    onDragEnd={this.handleImageReorder}
                                >
                                    <SortableContext
                                        items={images.map((img) => img.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        <div className="image-preview">
                                            {images.map((img) => (
                                                <SortableItem
                                                    key={img.id}
                                                    id={img.id}
                                                    img={img}
                                                    isFeatured={featuredImageId === img.id}
                                                    onDelete={this.removeImage}
                                                    onSetFeatured={this.setFeaturedImage}
                                                />
                                            ))}
                                        </div>
                                    </SortableContext>
                                </DndContext>
                            )}
                        </div>
                    </div>

                    {/* PRODUCT INFO */}
                    <div className="form-group">
                        <label>Product Name</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => this.setState({ productName: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Short Description</label>
                        <textarea
                            rows="2"
                            value={shortDesc}
                            onChange={(e) => this.setState({ shortDesc: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Long Description</label>
                        <textarea
                            rows="4"
                            value={longDesc}
                            onChange={(e) => this.setState({ longDesc: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>YouTube Video Link</label>
                        <input
                            type="url"
                            value={videoLink}
                            onChange={(e) => this.setState({ videoLink: e.target.value })}
                            placeholder="https://youtube.com/..."
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select
                            value={category}
                            onChange={(e) => this.setState({ category: e.target.value })}
                        >
                            <option value="">Select category</option>
                            <option value="food">Food</option>
                            <option value="textile">Textile</option>
                            <option value="construction">Construction</option>
                            <option value="electronics">Electronics</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Certifications</label>
                        <input
                            type="text"
                            value={certifications}
                            onChange={(e) => this.setState({ certifications: e.target.value })}
                            placeholder="e.g. ISO 9001, CE, Halal"
                        />
                    </div>

                    <div className="form-group">
                        <label>Deliverable Countries</label>
                        <div className="chips-input">
                            <div className="chips-container">
                                {this.state.deliverableCountries.map((country, i) => (
                                    <div key={i} className="chip">
                                        <span>{country}</span>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                this.setState((prev) => ({
                                                    deliverableCountries: prev.deliverableCountries.filter((c) => c !== country),
                                                }));
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <select
                                value={this.state.countryInput}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val && !this.state.deliverableCountries.includes(val)) {
                                        this.setState((prev) => ({
                                            deliverableCountries: [...prev.deliverableCountries, val],
                                            countryInput: "",
                                        }));
                                    }
                                }}
                            >
                                <option value="">Select country...</option>
                                {COUNTRIES.filter(c => !this.state.deliverableCountries.includes(c)).map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>


                    {/* WHOLESALE RANGES */}
                    <div className="form-group">
                        <label>Wholesale Quantity Ranges</label>
                        {ranges.map((r, i) => (
                            <div key={i} className="range-row">
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    value={r.qty}
                                    onChange={(e) =>
                                        this.handleRangeChange(i, "qty", e.target.value)
                                    }
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={r.price}
                                    onChange={(e) =>
                                        this.handleRangeChange(i, "price", e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    className="remove-btn"
                                    onClick={() => this.removeRange(i)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        <button type="button" className="add-btn" onClick={this.addRange}>
                            + Add Range
                        </button>
                    </div>



                    <div className="form-actions">
                        <button type="submit" className="submit-btn">
                            Save Product
                        </button>
                    </div>
                </form>
                <FlashMessageContainer />
            </div>
        );
    }
}
