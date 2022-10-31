module.exports ={
    apps:[
        {
            name: 'apiPOS',
            script: './src/index.js',
            watch: false,
            max_memory_restart:'1000M',
            exec_mode:'cluster',
            instances: 1
        }
    ]
}