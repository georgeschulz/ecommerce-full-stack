import { createSlice } from "@reduxjs/toolkit";

const wizardSlice = createSlice({
    name: 'wizard',
    initialState: {
        selectedPest: null
    },
    reducers: {
        updateSelectedPest: (state, action) => {
            state.selectedPest = action.payload.pest
        }
    }
})


export const selectSelectedPest = state => state.wizard.selectedPest;
export const { updateSelectedPest } = wizardSlice.actions;
export default wizardSlice.reducer;