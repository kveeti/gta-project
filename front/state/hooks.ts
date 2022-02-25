import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./store";

export const useISelector: TypedUseSelectorHook<RootState> = useSelector;
