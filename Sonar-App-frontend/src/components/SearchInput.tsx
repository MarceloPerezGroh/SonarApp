import { SearchIcon } from "../icons";
import "../styles/components/search-input.css";

export default function SearchInput({ placeholder }: { placeholder: string }) {
  return (
    <div className="search-input">
      <SearchIcon />
      <input type="text" placeholder={placeholder} />
    </div>
  );
}
