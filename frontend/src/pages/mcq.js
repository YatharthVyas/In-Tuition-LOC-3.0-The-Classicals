import React from 'react';
import Paper from '@material-ui/core/Paper';
import "./mcq.css"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
function Mcqs()
{
    
    var ans_key = ["B1","B2","A3"];
    var ans = [];
    const [marks,setMarks] = React.useState(0);
    
    for(var i = 0;i<=3;i++)
    {
        ans[i] = 0;
    }
    const handleMcq1 = (event) =>{
        
        
        ans[parseInt(event.target.name)] = event.target.value; 
        
        
        
        


    }
   
    
    const submitHandler = (event) =>{
        event.preventDefault();
        console.log(ans);
        var count = 0;
        console.log("This is working well");
        for(var i = 1;i<=ans.length-1;i++)
        {
            if(ans_key[i-1] == ans[i])
           
            count++;
        }
        console.log("MARKS " + count);
        setMarks(count);



    }
    return(
        <Paper  elevation = {3} className = "noselect">
        <div onKeyDown = {()=>console.log("Key Pressed")}>
        <h1>This is the Mcq Page!!!</h1>
        <form onSubmit = {submitHandler}>
         <div onChange = {handleMcq1}>   
        <div className="c1">
<h3>The answer to this question is :</h3>    
<input type="radio" id="result1" name="1" value="A1" className="butt2"  />Choice 1<br />
<input type="radio" id="result2" name="1" value="B1" className="butt2"  />Choice 2<br />
<input type="radio" id="result3" name="1" value="C1" className="butt2" />Choice 3<br />
<input type="radio" id="result4" name="1" value="D1" className="butt2" />Choice 4 <br />
    <p id="w1para" class="text-danger"></p>
    
     
    
    
     
    </div>
    <br />
    <p id="para7"></p>
<div className="c2">
    <h3>The answer to the second question is :</h3>
    <input type="radio" id="result5" name="2" value="A2" className="butt2"  />Choice 1<br />
    <input type="radio" id="result6" name="2" value="B2" className="butt2"  />Choice 2<br />
    <input type="radio" id="result7" name="2" value="C2" className="butt2"  />Choice 3<br />
    <input type="radio" id="result8" name="2" value="D2" className="butt2"  />Choice 4<br />
    <p id="w2para" class="text-danger"></p>
    </div>    
    <p id="para"></p>
    
   
    
    <br />
    <p id="para6"></p>

<div className="c3">
<h3>The answer to the third question is :</h3>    
<input type="radio" id="result9" name="3" value="A3" className="butt2"  />Choice 1<br />
<input type="radio" id="result10" name="3" value="B3" className="butt2"  />Choice 2<br />
<input type="radio" id="result11" name="3" value="C3" className="butt2" />Choice 3<br />
<input type="radio" id="result12" name="3" value="D3" className="butt2" />Choice 4 <br />
    <p id="w3para" class="text-danger"></p>
       
    </div>
    </div>  
   <input type = "submit" value = "Submit" /> 

    </form>
        </div>
        </Paper>

    )

}

export default Mcqs;