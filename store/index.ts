import { User } from "~/interfaces/User";
import { GetterTree, ActionTree, MutationTree } from "vuex";

export const state = () => ({
    token: "",
    page: "",
    client: {},
    user: {}
});

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    token: (state) => state.token,
    page: (state) => state.page,
    client: (state) => state.client,
    user: (state) => state.user
};

export const mutations: MutationTree<RootState> = {
    setToken(state, token: string) {
        state.token = token;
    },
    setPage(state, page: string) {
        state.page = page;
    },
    setClient(state, avatar: string) {
        state.client = avatar;
    },
    setUser(state, data: User) {
        state.user = data;
    }
};

export const actions: ActionTree<RootState, RootState> = {
    nuxtServerInit({ commit }) {
        const token = this.app.$cookies.get("token");
        commit("setToken", token);
        commit("setPage", "");
        commit("setClient", {});
    }
};
