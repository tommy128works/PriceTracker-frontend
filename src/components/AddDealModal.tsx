import { useState } from "react";
import { QUANTITY_UNITS } from "../constants/quantityUnits";
import { CURRENCY_UNITS } from "../constants/currencyUnits";
import { CANADA_PROVINCES } from "../constants/provinces";
import "./AddDealModal.css";
import { CANADA_CITIES } from "../constants/cities";

type AddDealModalProps = {
  onClose: () => void;
};

export default function AddDealModal({ onClose }: AddDealModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("g");
  const [currencyUnit, setCurrencyUnit] = useState("CAD");
  const [note, setNote] = useState("");
  const [dealDate, setDealDate] = useState("");
  const [brand, setBrand] = useState("");
  const [store, setStore] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");

  const cities = province ? (CANADA_CITIES[province] ?? []) : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add API call here later
    console.log({
      price,
      quantity,
      note,
    });

    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Deal</h2>

          <button type="button" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="brand">Brand Name</label>
            <input
              id="brand"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. Kirkland Signature"
            />
          </div>

          <div>
            <label htmlFor="name">Product Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <select
              value={currencyUnit}
              onChange={(e) => setCurrencyUnit(e.target.value)}
            >
              {CURRENCY_UNITS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              type="number"
              step="0.01"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
            <select
              value={quantityUnit}
              onChange={(e) => setQuantityUnit(e.target.value)}
            >
              {QUANTITY_UNITS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="note">Note</label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="deal-date">Deal date</label>
            <input
              id="deal-date"
              type="date"
              value={dealDate}
              onChange={(e) => setDealDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="store">Store</label>
            <input
              id="store"
              type="text"
              value={store}
              onChange={(e) => setStore(e.target.value)}
              placeholder="e.g. Walmart"
            />
          </div>

          <div>
            <label htmlFor="province">Province</label>
            <select
              id="province"
              value={province}
              onChange={(e) => {
                setProvince(e.target.value);
                setCity("");
              }}
            >
              <option value="">Select a province</option>

              {CANADA_PROVINCES.map((province) => (
                <option key={province.value} value={province.value}>
                  {province.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="city">City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!province}
            >
              <option value="">Select city</option>

              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit">Add Deal</button>
          </div>
        </form>
      </div>
    </div>
  );
}
