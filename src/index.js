import vPage from './vPage';

const Plugin = {
    install(Vue, options = {}){
        Vue.component(vPage.name, vPage);
    }
};

export default Plugin;