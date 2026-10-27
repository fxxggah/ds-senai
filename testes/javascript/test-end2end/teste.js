const {Builder, By} = require('selenium-webdriver');

async function playTest() {
    console.log('1. Abrindo o navegador...');
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        console.log('2. Acessando o site...');
        await driver.get('https://www.saucedemo.com');
        await driver.manage().window().maximize();

        console.log('3. Preenchendo o formulário de login...');
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.sleep(5000)

        console.log('4. Realizando o login...');
        await driver.findElement(By.id('login-button')).click();

        console.log('5. Aguardando a página de produtos carregar...');
        let titulo = await driver.findElement(By.className('title')).getText();
        if (titulo === 'Products') {
            console.log('TESTE PASSOU -> O título da página corresponde ao esperado:', titulo);
        } else {
            console.error('TESTE FALHOU -> O título da página não corresponde ao esperado. Título atual:', titulo);
        }

    } catch (error) {
        console.error('Erro durante o teste:', error);
    }

    finally {
        console.log('6. Fechando o navegador...');
        await driver.sleep(5000)
        await driver.quit();
    }

}

playTest();