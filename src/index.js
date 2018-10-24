import vPage from './Page';

const Plugin = {
    install(Vue, options = {}){
        if(Object.keys(options).length){
            if(options.language) vPage.props.language.default = options.language;
            if(options.align) vPage.props.align.default = options.align;
            if(typeof(options.info) === 'boolean') vPage.props.info.default = options.info;
            if(typeof(options.pageSizeMenu) !== 'undefined')
                vPage.props.pageSizeMenu.default = options.pageSizeMenu;
        }
        Vue.component(vPage.name, vPage);
    }
};

export default Plugin;