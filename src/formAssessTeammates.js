import { FormGroup, Stack } from "@mui/material";
import { Container } from "@mui/system";
import Opinion from "./components/Opinion";
import SaveButton from "./components/SaveButton";
import SubmitButton from "./components/SubmitButton";
import WarningDialogue from "./components/WarningDialog";
import Rate from "./rating.tsx";

export default function FormAssessTeammate({group, url, email, groupNumber, alreadySubmit, children}){
    const {user, groupInfo} =group
    console.log('FormAss user')
    console.log(user)
    var tag_rateMenu
    if(groupInfo){
        const members = getMembersFromGroupInfo(groupInfo) //Object.keys([...Array(5)]).map((e,i) => '成員'+(i+1))
        tag_rateMenu = members.map(
            (e,i) => {
                return  <Rate title={e} id={e} key={i} disabled={e===user}/>
            }
        )
    }
    
    return (
        <Container>
            <FormGroup>
                <Stack direction="column" spacing={3}>
                    {children}
                    <div className="rating-group">
                        {tag_rateMenu}
                    </div>
                    <div className="opinion">
                        <Opinion/>
                    </div>
                    {user?
                    
                
                    <Stack direction={"row"} spacing={1}>
                        <SubmitButton url = {url} email={email} groupNumber={groupNumber} disabled={alreadySubmit}/>
                        {/* <SubmitButton disabled={true}/> */}
                        <SaveButton url = {url} email={email}/>
                        
                    </Stack>:<></>}
                    <WarningDialogue/>
                </Stack>
            </FormGroup>
        </Container>
    )
}

function getMembersFromGroupInfo(groupInfo){
    //const groupInfo="1 (73031)陳詠瑄 (73077)邱亭毓 (73078)張雅涵 (73074)陳佳琦 (73048)陳佑齊 (73017)梁家嘉"
    groupInfo = groupInfo.replace(/\s+$/g,"")
    var groupMembers = groupInfo.split(" ")
    groupMembers.shift()
    return groupMembers
}

