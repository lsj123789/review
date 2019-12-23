import React from 'react'
import loadable from 'react-loadable'

const LoadableComponent = loadable({
    loader:() => import('./'),
    loading:() => {
        return (
            <div>正在加载</div>
        )
    } //加载过程中执行的函数
})

export default () => <LoadableComponent />