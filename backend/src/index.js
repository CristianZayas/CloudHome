const  {app}  =  require('./app/app')

app.listen(app.get('port'), async () => {
    console.log(`is run port ${app.get('port')}`)
})

