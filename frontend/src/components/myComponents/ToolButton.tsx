import { LineHeightIcon } from "@radix-ui/react-icons";

function ToolButton() {
   return (
      <button className="bg-white hover:bg-slate-950 hover:text-white border-xl p-2">
         <LineHeightIcon />
      </button>
   );
}

export default ToolButton;
