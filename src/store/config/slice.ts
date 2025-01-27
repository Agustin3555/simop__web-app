import { StateCreator } from 'zustand'
import { ToastsSlice } from '../slices'

export type AppStore = ToastsSlice

export type Slice<T> = StateCreator<AppStore, [], [], T>
