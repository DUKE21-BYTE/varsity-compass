// Varsity Compass Core Logic - Encrypted/Minified/Robus
const _g={'A':12,'A-':11,'B+':10,'B':9,'B-':8,'C+':7,'C':6,'C-':5,'D+':4,'D':3,'D-':2,'E':1};
function _0x1(i){let e=document.getElementById(i);return e&&e.value?e.value.trim():null} // Added trim()
function predictCourses(){
    const _o=document.getElementById('results-area');
    _o.style.display='block';
    
    // Capture Contact Info
    const _contact = _0x1('contact_info');
    if(!_contact || _contact.length < 5) {
        alert("Please provide a valid phone number or email so we can reach out with your full report.");
        // Optional: return; to force capture, but for UX we might allow soft warning
    }

    const _r={e:_0x1('eng'),k:_0x1('kisw'),m:_0x1('math'),b:_0x1('bio'),p:_0x1('phy'),c:_0x1('chem'),h:_0x1('hum1'),t:_0x1('tech1')};
    
    // Robustness: Ensure Critical Subjects exist
    if(!_r.m||!_r.e||!_r.k){
        _o.innerHTML="<div style='color:#d32f2f;background:#ffebee;padding:10px;border-radius:5px;'><strong>Error:</strong> Compulsory subjects (Math, Eng, Kisw) are missing.</div>";
        return
    }

    _o.innerHTML="<p>Please wait, analyzing...</p>";
    
    const _s={};const _gr={g1:[],g2:[],g3:[],g4:[]};const _ap=[];
    const _add=(k,g,n)=>{if(_r[k]){const p=_g[_r[k]];_s[k]=p;if(g)g.push({n:n||k,v:p});_ap.push(p)}};
    
    _add('e',_gr.g1);_add('k',_gr.g1);_add('m',_gr.g1);_add('b',_gr.g2);_add('p',_gr.g2);_add('c',_gr.g2);_add('h',_gr.g3);_add('t',_gr.g4);
    
    _ap.sort((a,b)=>b-a);
    const _t=_ap.slice(0,7).reduce((a,b)=>a+b,0);
    
    const _cl=(id)=>{
        const _v=(k)=>_s[k]||0;
        const _mx=(a)=>a.length>0?Math.max(...a.map(x=>x.v)):0;
        let r=0;
        try { // Added Error Boundary
            switch(id){
                case 1:case 2:r=_v('e')+_v('k')+_v('m')+Math.max(_mx(_gr.g2),_mx(_gr.g3),_mx(_gr.g4));break;
                case 3:r=_v('m')+_v('e')+_mx(_gr.g3)+_mx(_gr.g2);break;
                case 4:case 5:r=_v('e')+_v('m')+_mx(_gr.g3)+_mx([..._gr.g2,..._gr.g4]);break;
                case 7:if(!_s.p||!_s.c)return 0;r=_v('m')+_v('p')+_v('c')+Math.max(_v('b'),_mx(_gr.g4));break;
                case 8:r=_v('m')+_v('p')+_mx(_gr.g3)+Math.max(_v('b'),_v('c'),_mx(_gr.g4));break;
                case 9:if(!_s.p)return 0;r=_v('m')+_v('p')+Math.max(_v('c'),_v('b'))+_mx([..._gr.g3,..._gr.g4]);break;
                case 11:r=_v('m')+_mx(_gr.g2)+_mx(_gr.g3)+_mx(_gr.g4);break;
                case 13:case 14:case 15:if(!_s.o&&(!_s.b||!_s.c))return 0;r=_v('b')+_v('c')+Math.max(_v('m'),_v('p'))+Math.max(_v('e'),_v('k'));break;
                case 19:r=_v('b')+_v('c')+_v('m')+_v('e');break;
                default:_ap.sort((a,b)=>b-a);r=_ap.slice(0,4).reduce((a,b)=>a+b,0)
            }
        } catch(e){r=0}
        
        if(r>0&&_t>0){return(Math.sqrt((r/48)*(_t/84))*48).toFixed(3)}return 0
    };

    let _res=[];
    if(typeof kuccpsCourses!=='undefined'){
        kuccpsCourses.forEach(c=>{
            let w=parseFloat(_cl(c.cluster));let cut=c.cutoff_2023;
            if(w>0&&w>=cut-2){
                let d=w-cut;
                let co=d>=2?'#2E7D32':(d>=0?'#1565C0':'#FFC107'); // Updated Colors
                _res.push({...c,w:w,c:co,d:d})
            }
        })
    }
    
    _res.sort((a,b)=>b.d-a.d);
    
    let h=`<div style="background:#f0f9ff;padding:15px;border-radius:8px;margin-bottom:20px;text-align:center;">
        <h4>Analysis Complete</h4>
        <p><strong>Aggregate Points:</strong> ${_t}/84</p>
    </div>`;
    
    if(_contact) {
         h+=`<p style="text-align:center; font-size:0.9em; color:#666;">Report will be linked to: <strong>${_contact}</strong></p>`;
    }

    if(_res.length===0){
        h+=`<p style="color:red">No matches found based on 2023 cutoffs.</p>`
    }else{
        _res.slice(0,50).forEach(m=>{
            h+=`<div class="course-card" style="border-left:5px solid ${m.c};padding:12px;margin-bottom:10px;background:white;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                <div style="font-weight:700;color:#0A2342;">${m.course_name}</div>
                <div style="font-size:0.9rem;color:#555;">${m.uni_code}</div>
                <div style="font-size:0.85rem;background:#f8f9fa;padding:4px 8px;border-radius:4px;display:inline-block;">
                    Points: <strong>${m.w}</strong> / Cutoff: ${m.cutoff_2023}
                    <span style="color:${m.c};margin-left:5px;font-weight:bold;">(${m.d>0?'+':''}${m.d.toFixed(3)})</span>
                </div>
            </div>`
        });
        h+=`<div style="margin-top:2rem;padding:1.5rem;background:#E3F2FD;border:1px solid #BBDEFB;text-align:center;border-radius:8px;">
            <h4 style="color:#0A2342">Secure your slot today.</h4>
            <p>Strategic ranking avoids regret.</p>
            <a href="https://wa.me/254746558597?text=I%20got%20${_t}%20points%20and%20need%20help%20with%20placement" class="btn btn-primary" style="display:inline-block;padding:10px 20px;background:#FFC107;color:#0A2342;text-decoration:none;border-radius:5px;font-weight:bold;margin-top:10px;">Get Expert Strategy</a>
        </div>`
    }
    _o.innerHTML=h
}
