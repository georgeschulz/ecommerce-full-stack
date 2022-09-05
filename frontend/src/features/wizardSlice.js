import { createSlice } from "@reduxjs/toolkit";

const targetFromLocalStorage = () => {
    const target = localStorage.getItem('target');
    return target;
}

const wizardSlice = createSlice({
    name: 'wizard',
    initialState: {
        selectedPest: targetFromLocalStorage(),
        inWizardFlow: false,
        redirectUrl: '/',
        showSettingsModal: false
    },
    reducers: {
        updateSelectedPest: (state, action) => {
            localStorage.setItem('target', action.payload.pest)
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
        },
        toggleSettingsModal: (state) => {
            state.showSettingsModal = !state.showSettingsModal;
        }
    }
})


export const selectSelectedPest = state => state.wizard.selectedPest;
export const selectIsWarrantyFlow = state => state.wizard.inWizardFlow;
export const selectShowSettingsModal = state => state.wizard.showSettingsModal;
export const { updateSelectedPest, startWizardFlow, endWizardFlow, setRedirectUrl, toggleSettingsModal } = wizardSlice.actions;
export default wizardSlice.reducer;