import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { InitState } from "./InitState";
import { IDispatch } from "./store";

export const useIDispatch = () => useDispatch<IDispatch>();
export const useISelector: TypedUseSelectorHook<InitState> = useSelector;
