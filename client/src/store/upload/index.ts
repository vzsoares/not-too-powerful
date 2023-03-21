import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GuildChannelSummary, GuildSummary } from 'src/api/discord.api';

interface uploadState {
  selectedGuild: GuildSummary | null;
  selectedGuildChannel: GuildChannelSummary | null;
  modalOpen: boolean;
  step: number;
}

const initialState: uploadState = {
  selectedGuild: null,
  selectedGuildChannel: null,
  modalOpen: false,
  step: 1,
};

const uploadSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedGuild: (
      state,
      action: PayloadAction<uploadState['selectedGuild']>,
    ) => {
      state.selectedGuild = action.payload;
    },
    setSelectedGuildChannel: (
      state,
      action: PayloadAction<uploadState['selectedGuildChannel']>,
    ) => {
      state.selectedGuildChannel = action.payload;
    },
    setModalOpen: (state, action: PayloadAction<uploadState['modalOpen']>) => {
      state.modalOpen = action.payload;
    },
    setStep: (state, action: PayloadAction<uploadState['step']>) => {
      state.step = action.payload;
    },
  },
});

export const {
  setSelectedGuild,
  setSelectedGuildChannel,
  setModalOpen,
  setStep,
} = uploadSlice.actions;

export default uploadSlice.reducer;
