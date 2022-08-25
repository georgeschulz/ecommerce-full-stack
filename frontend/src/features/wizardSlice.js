import { createSlice } from "@reduxjs/toolkit";

const wizardSlice = createSlice({
    name: 'wizard',
    initialState: {
        selectedPest: null,
        inWizardFlow: false,
        redirectUrl: '/'
    },
    reducers: {
        updateSelectedPest: (state, action) => {
            state.selectedPest = action.payload.pest
        },
        startWizardFlow: (state, action) => {
            state.inWizardFlow = true
        },
        endWizardFlow: (state, action) => {
            state.inWizardFlow = false;
            state.selectedPest = false;
        },
        setRedirectUrl: (state, action) => {
            state.redirectUrl = action.payload.url;
        }
    }
})


export const selectSelectedPest = state => state.wizard.selectedPest;
export const selectIsWarrantyFlow = state => state.wizard.inWizardFlow;
export const { updateSelectedPest, startWizardFlow, endWizardFlow, setRedirectUrl } = wizardSlice.actions;
export default wizardSlice.reducer;