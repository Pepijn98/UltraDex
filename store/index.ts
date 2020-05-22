import { GetterTree, ActionTree, MutationTree } from "vuex";

export const state = () => ({
    page: ""
});

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    page: (state) => state.page
};

export const mutations: MutationTree<RootState> = {
    setPage(state, page: string) {
        state.page = page;
    }
};

export const actions: ActionTree<RootState, RootState> = {
    nuxtServerInit({ commit }) {
        commit("setPage", "");
    }
};
