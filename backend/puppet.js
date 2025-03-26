import puppeteer from "puppeteer";

export const getuser = async (roll, pass) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://webkiosk.thapar.edu/index.jsp');
    console.log(await page.title())

    //login
    await page.type('[name="MemberCode"]', roll)
    await page.type('[name="Password"]', pass)

    await Promise.all([
        page.click('#BTNSubmit'),
        page.waitForNavigation({ waitUntil: 'domcontentloaded' })
    ]);
    
    const datafinder = async (frame, selector) => {
        await frame.waitForSelector(selector);
        const el = await frame.$(selector);
        return frame.evaluate(el => el.innerText, el);
    };

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    try{
        const frames = await page.frames();
        

        let framereq = frames[2];  
        let detailFrame = frames.find(frame => frame.name() === 'DetailSection') 

        
        await framereq.waitForSelector('#sub1 > a:nth-child(2)')
        let el = await framereq.$('#sub1 > a:nth-child(2)')
        await framereq.evaluate(el => el.click(), el)

        await delay(200); 
        detailFrame = (await page.frames()).find(frame => frame.name() === 'DetailSection')

        const lastsemester = (await datafinder(detailFrame, 'body > center:nth-child(2) > table > tbody > tr:nth-child(7) > td:nth-child(2) > font')).trim()
        const name = (await datafinder(detailFrame, 'body > center:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2) > font')).trim()
        const branch = ((await datafinder(detailFrame, 'body > center:nth-child(2) > table > tbody > tr:nth-child(6) > td:nth-child(2) > font > font')).trim()).slice(2,5)

        

        
        await framereq.waitForSelector('#sub5 > a:nth-child(8)')
        el = await framereq.$('#sub5 > a:nth-child(8)') 
        await framereq.evaluate(el => el.click(), el)

        await delay(400);
        detailFrame = (await page.frames()).find(frame => frame.name() === 'DetailSection')

        
        let semester = {}
        
        let cnt = await detailFrame.evaluate(()=>{
            return document.querySelectorAll('#table-1 > tbody > tr').length
        })

        let cgpa = 0
       

        await Promise.all(
            Array.from({length:cnt}, async (_,i) => {
                let arr = await detailFrame.evaluate((i)=>{
                    return Array.from(document.querySelectorAll(`#table-1 > tbody > tr:nth-child(${i+1})`)).map(x=>x.innerText)
                }, i)
                const cg = (arr[0].split('\t'))[4]
                cgpa += parseFloat(cg)
                semester[(i+1).toString()] = {"sgpa" : cg,'subjects' : {}}
            })
        )
        
        let avg_cgpa = (cgpa/cnt).toString()
        

        // grades and marks
        el = await framereq.$('#sub5 > a:nth-child(5)')
        await framereq.evaluate((x)=>x.click(), el)

        await delay(400)
        detailFrame = (await page.frames()).find(frame => frame.name() === 'DetailSection')

        // const selectElement = await detailFrame.$('#exam')
        
        
        for(let i = 0;i<cnt;i++){
            const el = await detailFrame.$(`#exam > option:nth-child(${i+2})`)
            const value = await detailFrame.evaluate((x)=>x.value, el)
            // console.log(value)
            await detailFrame.select('#exam',value)
            await detailFrame.waitForSelector('input[type=submit]');
            const showbuttonel = await detailFrame.$('input[type=submit]')
            await detailFrame.evaluate((x)=>x.click(), showbuttonel)
            await delay(400)
            detailFrame = (await page.frames()).find(frame => frame.name() === 'DetailSection')
            
            const len = await detailFrame.evaluate(()=>{
                return document.querySelectorAll('#table-1 > tbody > tr').length
            })
            
            await Promise.all(
                Array.from({length:len},async (_,j) => {
                    let arr = await detailFrame.evaluate((j) => {
                        return Array.from(document.querySelectorAll(`#table-1 > tbody > tr:nth-child(${j+1})`)).map((x)=>x.innerText)
                    }, j)
                    arr = arr[0].split('\t')
                    const subject = arr[0].trim(), marks = arr[2].trim(), grade = arr[4].trim()
                    const code = (subject.split('('))[1].slice(0,6)

                    // console.log(subject + ' ' + marks + ' ' + grade)
                    semester[((cnt-i).toString())]['subjects'][code] = {
                        'marks' : marks,
                        'grade' : grade,
                        'name' : subject,
                        'marks_grid' : {}
                    }

                })
            )
        }

        //marks grid 
        el = await framereq.$('#sub5 > a:nth-child(2)')
        await framereq.evaluate((x)=>x.click(), el)

        await delay(400)
        detailFrame = (await page.frames()).find(frame => frame.name() === 'DetailSection')

        
        
        
        for(let i = 0;i<cnt;i++){
            const el = await detailFrame.$(`#exam > option:nth-child(${i+3})`)
            const value = await detailFrame.evaluate((x)=>x.value, el)
            // console.log(value)
            await detailFrame.select('#exam',value)
            await detailFrame.waitForSelector('input[type=submit]');
            const showbuttonel = await detailFrame.$('input[type=submit]')
            await detailFrame.evaluate((x)=>x.click(), showbuttonel)
            await delay(400)
            detailFrame = (await page.frames()).find(frame => frame.name() === 'DetailSection')
            
            const len = await detailFrame.evaluate(()=>{
                return document.querySelectorAll('#table-1 > tbody > tr').length
            })
            
            
            await Promise.all(
                Array.from({length:len},async (_,j) => {
                    let arr = await detailFrame.evaluate((j) => {
                        return Array.from(document.querySelectorAll(`#table-1 > tbody > tr:nth-child(${j+1})`)).map((x)=>x.innerText)
                    }, j)
                    arr = arr[0].split('\t')
                    console.log(arr)
                    const subject = arr[2].trim(), marks = arr[7].trim(), outof = arr[6].trim(), event = arr[3].trim()
                    const code = (subject.split('('))[1].slice(0,6)
                    semester[((cnt-i).toString())]['subjects'][code]['marks_grid'][event] = {
                        "obtained" : marks,
                        "outof" : outof
                    }

                })
            )
        }

        
        
        // console.log(semester)
        const user = {
            name,
            roll,
            branch,
            "currentsemester" : lastsemester,
            avg_cgpa,
            semester,
            "success":true
        }
        return {user}


    } 
    catch(error){
        const user = {
            "success": false,
            "error": error.message || "An unknown error occurred"
        }
        return {user};
        console.log("eroor found : ", error)
        
    } 
    finally{
        await browser.close()
    }
};
