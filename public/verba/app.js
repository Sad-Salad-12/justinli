'use strict';
const $ = (id) => document.getElementById(id);
let visualAssets = [];
const copy = {
  en: {
    eyebrow:'INTERACTIVE DEMO / EDUCATION',heading:'From a brief to a grounded solution.',intro:'Explore the evidence, read the proposal, then step through a three-slide preview.',briefTitle:'Start with a brief',sampleMode:'Sample experience',liveMode:'Live AI',briefLabel:'Your requirement',inputNote:'Use a fictional or public scenario.',reset:'Restore selected example',localHelp:'For real generation, run “Start Verba.command”, then open the local service. Configure the server’s .env using the README. API keys stay on your computer.',openLocal:'Open local service ↗',scope:'Three public education cases. Proposed designs require human review.',resultTitle:'Explore the result',proposalTab:'Solution',slidesTab:'Presentation preview',expand:'Enlarge ↗',previous:'← Previous',next:'Next →',htmlPreview:'HTML preview · 3 slides',evidenceTitle:'Behind the recommendation',evidenceHelp:'Source excerpts are evidence, not guarantees of future results.',footer:'Independent portfolio demo. Feishu / Lark visuals illustrate product capabilities; no affiliation implied.',close:'Close ×',sampleHelp:'Explore an authored example. This mode does not call AI.',liveHelp:'Generate with your Ark model using a local, read-only case collection.',view:'View example →',generate:'Generate solution →',working:'Generating…',sampleBadge:'PREBUILT EXAMPLE',liveBadge:'LIVE AI RESULT',sampleContext:'Prebuilt example · No model call. Edit your own brief in Live AI mode.',liveContext:'Generated from your submitted brief. Review proposals and source support before use.',edited:'This example does not answer your edits. Restore it or switch to Live AI.',generating:'Retrieving evidence and drafting your solution. This can take up to 60 seconds.',ready:'Example ready. Explore the solution or slide preview.',complete:'Your solution and three-slide preview are ready.',unavailable:'Live AI needs server configuration. See README for the API key, model, resource-pack confirmation and prices.',offline:'Real generation is available through the local service. The offline examples are ready to explore.',budget:'Monthly demo budget reached. You can still explore examples.',remaining:'Remaining monthly budget',diagnosis:'Requirement diagnosis',proposals:'Proposed solution',implementation:'Implementation steps',risks:'Risks & validation',validate:'To validate',sources:'sources',page:'p.',original:'Original Chinese source',translated:'Translation for reference',none:'No matching evidence was found. Treat the result as a proposed approach requiring validation.',slideNames:['Requirements & goals','Solution architecture','Implementation roadmap'],suggested:'PROPOSED DESIGN · HUMAN REVIEW REQUIRED',visualNote:'Official product illustration, not a screenshot of this proposed implementation.',phase:'STAGE',previewSummary:'Condensed preview. The Solution tab contains the full text.',usage:'Model usage',tokens:'tokens',estimated:'conservative reservation',actual:'reported usage',resultLanguage:'Result language',errorPrefix:'Generation was not completed. Your input and previous result are preserved.',errors:{configuration_required:'Configure the local service before generating.',credentials_or_model:'Check the API key and the selected model’s access in Ark.',provider_quota:'The provider rejected the request due to its quota or rate limit.',provider_error:'The provider returned an error. No automatic retry was made.',network_error:'The model service could not be reached.',timeout:'The request timed out. Its reserved budget is retained because the provider may still bill it.',invalid_output:'The model returned an incomplete or invalid structure. No automatic paid retry was made.',budget_exhausted:'The remaining monthly budget cannot cover this request.',busy:'A request is already running. Please wait.',context_too_large:'The combined context is too large; shorten your brief.',empty_brief:'Enter a requirement before generating.',unknown:'Please check the local service and try again when ready.'}},
  zh: {
    eyebrow:'互动试玩 / 教育协作',heading:'从一个需求，到有依据的方案。',intro:'查看案例证据、阅读方案，再逐页浏览三页演示预览。',briefTitle:'输入一个需求',sampleMode:'样例体验',liveMode:'实时 AI',briefLabel:'你的需求',inputNote:'请使用虚构或公开场景。',reset:'恢复所选样例',localHelp:'真实生成请运行“Start Verba.command”，再打开本地服务。按 README 配置服务端 .env，API Key 仅留在本机服务端。',openLocal:'打开本地服务 ↗',scope:'三个公开教育案例。建议方案需要人工复核。',resultTitle:'探索生成结果',proposalTab:'方案',slidesTab:'演示预览',expand:'放大查看 ↗',previous:'← 上一页',next:'下一页 →',htmlPreview:'HTML 预览 · 共 3 页',evidenceTitle:'建议背后的依据',evidenceHelp:'来源摘录是参考证据，不代表对未来成效的承诺。',footer:'独立作品集演示。飞书 / Lark 素材仅用于说明产品能力，不代表官方关联。',close:'关闭 ×',sampleHelp:'查看预先编写的样例，不调用 AI。',liveHelp:'通过本地只读案例库检索，调用你的火山模型生成。',view:'查看样例 →',generate:'生成方案 →',working:'正在生成…',sampleBadge:'预置样例',liveBadge:'实时 AI 结果',sampleContext:'预置样例 · 未调用模型。要处理自己的需求，请切换实时 AI。',liveContext:'根据你提交的需求生成，使用前请复核建议及其来源支持。',edited:'当前样例不回答你修改后的需求，请恢复样例或切换实时 AI。',generating:'正在检索证据并起草方案，最多需要约 60 秒。',ready:'样例已就绪，可查看方案或演示预览。',complete:'方案和三页演示预览已就绪。',unavailable:'实时 AI 需要配置本地服务。请按 README 设置 Key、模型、资源包确认及价格。',offline:'真实生成需打开本地服务；离线样例可直接体验。',budget:'本月演示预算已用完，仍可体验预置样例。',remaining:'本月剩余预算',diagnosis:'需求诊断',proposals:'建议方案',implementation:'实施步骤',risks:'风险与待确认事项',validate:'待验证',sources:'条来源',page:'页',original:'中文原始摘录',translated:'参考译文',none:'未找到匹配证据，生成内容仅为待验证的建议。',slideNames:['需求与目标','解决方案架构','实施路线图'],suggested:'建议设计 · 需人工复核',visualNote:'官方产品示意图，并非本方案的实际实施截图。',phase:'阶段',previewSummary:'此处为精简预览，完整内容见“方案”标签。',usage:'模型用量',tokens:'tokens',estimated:'保守预留',actual:'实际报告用量',resultLanguage:'结果语言',errorPrefix:'生成未完成，已保留输入和上次结果。',errors:{configuration_required:'请先完成本地服务配置。',credentials_or_model:'请检查火山 API Key 和所选模型的访问权限。',provider_quota:'服务商因额度或频率限制拒绝了请求。',provider_error:'模型服务返回错误，未自动重试。',network_error:'无法连接模型服务。',timeout:'请求超时。服务商仍可能计费，因此保留了本次费用预留。',invalid_output:'模型返回的结构不完整或无效，未自动重复付费调用。',budget_exhausted:'本月剩余预算不足以覆盖本次请求。',busy:'已有请求正在运行，请稍后。',context_too_large:'上下文过长，请缩短需求。',empty_brief:'请先输入需求。',unknown:'请检查本地服务，就绪后可手动重试。'}}
};
copy.en.pan = 'On a small screen, swipe the canvas sideways to explore the enlarged slide.';
copy.zh.pan = '小屏幕可在画布内横向滑动，查看放大后的整页内容。';
copy.en.liveHelp='Generate with your configured model and the local case collection.';
copy.zh.liveHelp='结合本地案例，调用已配置的模型生成。';
copy.en.unavailable='AI is temporarily unavailable. Please try again later.';
copy.zh.unavailable='AI 暂时不可用，请稍后再试。';
copy.en.errors.credentials_or_model=copy.en.unavailable;
copy.zh.errors.credentials_or_model=copy.zh.unavailable;
copy.en.errors.rate_limited='The demo is busy or your trial limit has been reached. Please try again later.';
copy.zh.errors.rate_limited='当前试玩繁忙或已达到试玩次数限制，请稍后再试。';
copy.en.errors.service_unavailable=copy.en.unavailable;
copy.zh.errors.service_unavailable=copy.zh.unavailable;
Object.assign(copy.en,{heading:'Try a solution.',sampleMode:'Examples',slidesTab:'Slides',sampleHelp:'',ready:'',sampleContext:'',evidenceTitle:'Sources',more:'Implementation & risks',footer:'Independent demo · Illustrative proposals, subject to review.',reset:'Reset example'});
Object.assign(copy.zh,{heading:'试着生成一个方案。',sampleMode:'样例',slidesTab:'演示',sampleHelp:'',ready:'',sampleContext:'',evidenceTitle:'参考来源',more:'实施步骤与风险',footer:'独立演示 · 建议仅供参考，使用前请复核。',reset:'恢复样例'});
let lang = new URLSearchParams(location.search).get('lang') === 'zh' ? 'zh' : 'en', mode = 'sample', selected = 0, slideIndex = 0, tab = 'slides', busy = false;
let serverStatus = null, result = null, resultBrief = '';
const t = (key) => copy[lang][key];
function el(tag, cls, text) { const node = document.createElement(tag); if (cls) node.className = cls; if (text !== undefined) node.textContent = text; return node; }
function shorten(text, max) { const chars = Array.from(text); return chars.length > max ? chars.slice(0,max-1).join('') + '…' : text; }
function textStatus(text, error=false) { $('status').textContent=text; $('status').classList.toggle('error',error); }
function sampleResult(index) {
  const sample=window.VERBA_SAMPLES[index], content=sample[lang], report={};
  for (const section of ['diagnosis','proposals','implementation','risks']) report[section]=content[section].map(([text,refs])=>({text,refs,needs_validation:!refs.length}));
  return {title:content.title,language:lang,mode:'sample',report,slides:content.slides,architecture:content.architecture,sources:window.VERBA_EVIDENCE.filter(r=>r.case===sample.id),asset:sample.asset};
}
function paintScenarios() {
  $('scenarios').replaceChildren();
  window.VERBA_SAMPLES.forEach((sample,index)=>{
    const option=el('option','',sample[lang].name);option.value=String(index);option.selected=index===selected;$('scenarios').append(option);
  });
  $('scenarios').disabled=busy;
}
function updateControls() {
  const changed=$('brief').value.trim()!==window.VERBA_SAMPLES[selected][lang].brief.trim();
  $('sample-mode').setAttribute('aria-pressed',String(mode==='sample'));
  $('live-mode').setAttribute('aria-pressed',String(mode==='live'));
  $('sample-mode').disabled=busy;$('live-mode').disabled=busy;$('language').disabled=busy;$('reset-sample').disabled=busy;
  $('brief').disabled=busy;
  $('reset-sample').hidden=!changed;
  renderResultContext();
  $('counter').textContent=`${$('brief').value.length} / 1000`;
  $('generate').textContent=t(busy?'working':mode==='sample'?'view':'generate');
  $('generate').disabled=busy || (mode==='sample'?changed:!serverStatus?.live_available || !$('brief').value.trim());

  if (!busy && mode==='sample' && changed) textStatus(t('edited'));
}
function selectSample(index) {
  selected=index;$('brief').value=window.VERBA_SAMPLES[index][lang].brief;
  if(mode==='sample'){result=sampleResult(index);resultBrief=$('brief').value;slideIndex=0;renderResult();}
  paintScenarios();updateControls();textStatus(mode==='sample'?t('ready'):liveMessage());
}
function liveMessage(){
  if(location.protocol==='file:') return t('offline');
  if(serverStatus?.live_available) return '';
  return serverStatus && !serverStatus.missing.length ? t('budget') : t('unavailable');
}
function setMode(value){mode=value;updateControls();textStatus(value==='live'?liveMessage():t('ready'));if(value==='sample' && $('brief').value.trim()!==window.VERBA_SAMPLES[selected][lang].brief.trim())textStatus(t('edited'));}
function setTab(value,focus=false){
  tab=value;
  for(const name of ['slides','proposal']){
    $(`${name}-tab`).setAttribute('aria-selected',String(name===value));$(`${name}-tab`).tabIndex=name===value?0:-1;$(`${name}-panel`).hidden=name!==value;
  }
  if(focus)$(`${value}-tab`).focus();
}
function paintLanguage(){
  document.documentElement.lang=lang;document.title=lang==='en'?'Verba · Interactive demo':'Verba · 互动试玩';
  document.querySelectorAll('[data-i18n]').forEach(node=>node.textContent=t(node.dataset.i18n));
  $('language').textContent=lang==='en'?'中文':'EN';paintScenarios();updateControls();renderResult();
}
function revealSource(id){
  $('evidence-panel').open=true;
  const node=document.getElementById('source-'+id);if(node){node.open=true;node.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});node.querySelector('summary').focus();}
}
function renderReport(){
  const target=$('report');target.replaceChildren(el('h2','report-title',result.title));
  const more=el('details','report-more');more.append(el('summary','',t('more')));
  if(result.mode==='live' && result.sections){
    target.append(el('p','live-thesis',result.thesis));
    more.querySelector('summary').textContent=lang==='zh'?'展开完整方案':'Read the full solution';
    result.sections.forEach((part,index)=>{
      const section=el('section','report-section live-report-section'),list=el('ul');section.append(el('h3','',part.heading),list);
      part.points.forEach(point=>{
        const li=el('li');li.append(document.createTextNode(point.text));
        point.refs.forEach(ref=>{const i=result.sources.findIndex(r=>r.id===ref);if(i<0)return;const btn=el('button','ref-link',`[${i+1}]`);btn.addEventListener('click',()=>revealSource(ref));li.append(btn);});
        if(point.needs_validation)li.append(el('span','validation',t('validate')));list.append(li);
      });
      (index<2?target:more).append(section);
    });
    target.append(more);return;
  }
  for(const key of ['diagnosis','proposals','implementation','risks']){
    const section=el('section','report-section'), list=el('ul');section.append(el('h3','',t(key)),list);
    for(const point of result.report[key]){
      const li=el('li');li.append(document.createTextNode(point.text));
      point.refs.forEach(ref=>{const index=result.sources.findIndex(r=>r.id===ref);if(index<0)return;const btn=el('button','ref-link',`[${index+1}]`);btn.type='button';btn.setAttribute('aria-label',`${t('evidenceTitle')} ${index+1}`);btn.addEventListener('click',()=>revealSource(ref));li.append(btn);});
      if(point.needs_validation)li.append(el('span','validation',t('validate')));list.append(li);
    }
    if(key==='implementation'||key==='risks')more.append(section);else target.append(section);
  }
  target.append(more);
}
function renderSources(){
  $('evidence-count').textContent=`${result.sources.length} ${t('sources')}`;$('sources').replaceChildren();
  if(!result.sources.length)$('sources').append(el('p','help',t('none')));
  result.sources.forEach((source,index)=>{
    const details=el('details');details.id='source-'+source.id;
    const summary=el('summary');summary.append(el('span','',`${index+1}. ${lang==='en'?source.title_en:source.title}`),el('small','',lang==='en'?`p. ${source.page}`:`第 ${source.page} 页`));
    details.append(summary,el('blockquote','',source.quote));
    if(lang==='en')details.append(el('p','source-translation',`${t('translated')}: ${source.translation}`));
    details.append(el('p','source-meta',source.file));$('sources').append(details);
  });
}
function svgEl(tag,attributes={}){const node=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [key,value]of Object.entries(attributes))node.setAttribute(key,String(value));return node;}
function diagram(labels){
  const svg=svgEl('svg',{viewBox:'0 0 800 150',role:'img','aria-label':labels.join(' → ')});svg.classList.add('architecture-svg');
  const n=labels.length,w=(800-(n-1)*30)/n;
  labels.forEach((label,i)=>{
    const x=i*(w+30);
    if(i<n-1){svg.append(svgEl('path',{d:`M ${x+w+5} 70 L ${x+w+24} 70 M ${x+w+19} 65 L ${x+w+24} 70 L ${x+w+19} 75`,stroke:'#145bff','stroke-width':2,fill:'none'}));}
    svg.append(svgEl('rect',{x,y:22,width:w,height:98,rx:8,fill:i===0?'#145bff':'#ffffff',stroke:i===0?'#145bff':'#bfd0ef'}));
    const number=svgEl('text',{x:x+14,y:43,fill:i===0?'#ccdfff':'#7185a4','font-size':10});number.textContent=`0${i+1}`;svg.append(number);
    const text=svgEl('text',{x:x+w/2,y:71,'text-anchor':'middle',fill:i===0?'#ffffff':'#162c50','font-size':14,'font-family':'system-ui,sans-serif'});
    const safe=shorten(label,40);let lines=[];
    if(/[\u4e00-\u9fff]/.test(safe)){const chars=Array.from(safe);for(let j=0;j<chars.length;j+=10)lines.push(chars.slice(j,j+10).join(''));}
    else {let line='';for(const word of safe.split(/\s+/)){if((line+' '+word).length>19 && line){lines.push(line);line='';}line+=(line?' ':'')+word;}if(line)lines.push(line);}
    lines.slice(0,2).forEach((line,j)=>{const span=svgEl('tspan',{x:x+w/2,dy:j?19:0});span.textContent=shorten(line,22);text.append(span);});svg.append(text);
  });return svg;
}
function liveGraph(items,connections){
  const svg=svgEl('svg',{viewBox:'0 0 800 240',role:'img','aria-label':connections.map(([a,b])=>items[a].title+' → '+items[b].title).join('; ')});
  const positions=items.length<=2?[[220,120],[580,120]]:[[220,60],[580,60],[220,180],[580,180]];
  connections.forEach(([a,b])=>{
    const [x,y]=positions[a],[xx,yy]=positions[b],angle=Math.atan2(yy-y,xx-x);
    const dx=Math.cos(angle),dy=Math.sin(angle),distance=Math.abs(xx-x)>Math.abs(yy-y)?123:39;
    const startX=x+dx*distance,startY=y+dy*distance,endX=xx-dx*distance,endY=yy-dy*distance;
    svg.append(svgEl('line',{x1:startX,y1:startY,x2:endX,y2:endY,stroke:'currentColor','stroke-width':2,opacity:.6}));
    svg.append(svgEl('path',{d:`M ${endX-dx*9-dy*5} ${endY-dy*9+dx*5} L ${endX} ${endY} L ${endX-dx*9+dy*5} ${endY-dy*9-dx*5}`,stroke:'currentColor','stroke-width':2,fill:'none'}));
  });
  items.forEach((item,i)=>{const [x,y]=positions[i];svg.append(svgEl('rect',{x:x-115,y:y-33,width:230,height:66,rx:6,fill:'var(--live-node)',stroke:'currentColor','stroke-opacity':.3}));
    const text=svgEl('text',{x,y:y+5,'text-anchor':'middle','font-size':16,fill:'currentColor','font-family':'system-ui,sans-serif'});text.textContent=shorten(item.title,/[\u4e00-\u9fff]/.test(item.title)?13:25);svg.append(text);
  });return svg;
}
function buildPresentationSlide(index){
  const data=result.slides[index],zh=result.language==='zh',language=copy[result.language];
  // The authored examples own the visual system; model output supplies content only.
  const slide=el('article','slide generated-slide'),brand=el('div','slide-brand');
  const wordmark=el('span','slide-wordmark','verba');wordmark.append(el('span','brand-dot','.'));
  brand.append(wordmark,el('span','slide-tag','VERBA / SOLUTION CONCEPT'));slide.append(brand);
  slide.append(el('h3','',shorten(data.title,zh?40:80)));
  if(index===0){
    const main=el('div','slide-main'),left=el('div'),list=el('ul');
    data.items.slice(0,2).forEach(item=>list.append(el('li','',shorten(item.body,zh?65:130))));left.append(list);
    const right=el('div','solution-visual');
    const asset=visualAssets.find(asset=>asset.kind==='product-ui' && asset.file===data.image);
    if(asset){
      main.classList.add('slide-main-illustrated');
      const photo=el('img','slide-photo');photo.src='assets/'+asset.file;photo.alt=zh?asset.caption_zh:asset.caption_en;
      const link=el('a');link.href=asset.source;link.target='_blank';link.rel='noopener noreferrer';link.title=language.visualNote;link.append(photo);
      right.append(link,el('p','slide-caption',(zh?'飞书官方示意 · ':'Feishu illustration · ')+photo.alt));
    }else{
      data.items.slice(0,3).forEach((item,i)=>{const row=el('div','solution-visual-row');row.append(el('span','',`0${i+1}`),el('strong','',shorten(item.title,zh?16:36)));right.append(row);});
    }
    main.append(left,right);slide.append(main);
  }else if(index===1){
    slide.append(el('p','slide-caption',shorten(data.takeaway,zh?65:145)));
    const graph=liveGraph(data.items,data.connections);graph.classList.add('solution-graph');slide.append(graph);
    const points=el('div','slide-points');data.items.slice(0,2).forEach(item=>points.append(el('p','',shorten(item.body,zh?65:145))));slide.append(points);
  }else{
    const stages=el('div','roadmap');data.items.forEach((item,i)=>{const stage=el('div','roadmap-step');stage.append(el('strong','',`0${i+1}`),el('h4','',shorten(item.title,zh?14:30)),el('p','',shorten(item.body,zh?65:130)));stages.append(stage);});slide.append(el('p','slide-caption',shorten(data.takeaway,zh?65:145)),stages);
  }
  const foot=el('div','slide-bottom');foot.append(el('span','',language.previewSummary),el('span','slide-number',`0${index+1} / 03`));slide.append(foot);
  return slide;
}
function buildSlide(index){ return buildPresentationSlide(index); }
function renderSlides(){
  $('slide-stage').replaceChildren(buildSlide(slideIndex));$('expanded-slide').replaceChildren(buildSlide(slideIndex));$('slide-count').textContent=`0${slideIndex+1} / 03`;
  $('previous').disabled=$('dialog-prev').disabled=slideIndex===0;$('next').disabled=$('dialog-next').disabled=slideIndex===2;

}
function renderResultContext(){
  if(!result)return;
  const stale=$('brief').value.trim()!==resultBrief.trim();
  $('result-context').textContent=stale
    ? (lang==='zh'?'当前显示上一次结果，点击生成以更新。':'Showing the previous result. Generate to update it.')
    : t(result.mode==='live'?'liveContext':'sampleContext')+(result.language!==lang?` ${t('resultLanguage')}: ${result.language==='en'?'English':'中文'}.`:'');
}
function renderResult(){if(!result)return;
  renderResultContext();
  renderReport();renderSources();renderSlides();setTab(tab);
  $('usage').textContent=result.usage?`${t('usage')}: ${result.usage.input_tokens??'—'} + ${result.usage.output_tokens??'—'} ${t('tokens')} · $${result.usage.cost_usd.toFixed(6)} · ${t(result.usage.estimated?'estimated':'actual')}`:'';
}
async function refreshStatus(){
  if(location.protocol==='file:')return;
  try{const response=await fetch('/api/demo/status',{signal:AbortSignal.timeout(5000)});if(response.ok)serverStatus=await response.json();else serverStatus=null;}catch{serverStatus=null;}
  updateControls();
}
async function generate(){
  if(busy)return;if(mode==='sample'){if($('brief').value.trim()!==window.VERBA_SAMPLES[selected][lang].brief.trim())return;result=sampleResult(selected);resultBrief=$('brief').value;slideIndex=0;renderResult();textStatus(t('ready'));return;}
  busy=true;updateControls();paintScenarios();textStatus(t('generating'));
  try{
    const response=await fetch('/api/demo/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({brief:$('brief').value,language:lang}),signal:AbortSignal.timeout(70000)});
    const data=await response.json();if(!response.ok)throw new Error(typeof data.detail==='string'?data.detail:'unknown');
    result=data;resultBrief=$('brief').value;slideIndex=0;renderResult();textStatus(t('complete'));
  }catch(error){const code=error.name==='TimeoutError'?'timeout':error.message;textStatus(t('errorPrefix')+' '+(t('errors')[code]||t('errors').unknown),true);}
  finally{busy=false;await refreshStatus();updateControls();paintScenarios();}
}
$('language').addEventListener('click',()=>{const old=lang,wasSample=$('brief').value===window.VERBA_SAMPLES[selected][old].brief;lang=old==='en'?'zh':'en';if(wasSample)$('brief').value=window.VERBA_SAMPLES[selected][lang].brief;if(result.mode==='sample'){result=sampleResult(selected);resultBrief=window.VERBA_SAMPLES[selected][lang].brief;}paintLanguage();textStatus(mode==='live'?liveMessage():t('ready'));if(mode==='sample'&&!wasSample)textStatus(t('edited'));});
$('sample-mode').addEventListener('click',()=>setMode('sample'));$('live-mode').addEventListener('click',()=>setMode('live'));
$('reset-sample').addEventListener('click',()=>selectSample(selected));$('brief').addEventListener('input',()=>{if(mode==='sample')mode='live';textStatus('');updateControls();});
$('generate').addEventListener('click',generate);
$('scenarios').addEventListener('change',event=>selectSample(Number(event.target.value)));
for(const name of ['slides','proposal']){$(`${name}-tab`).addEventListener('click',()=>setTab(name));$(`${name}-tab`).addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();setTab(event.key==='Home'?'slides':event.key==='End'?'proposal':tab==='proposal'?'slides':'proposal',true);}});}
function moveSlide(offset){slideIndex=Math.max(0,Math.min(2,slideIndex+offset));renderSlides();}
for(const id of ['previous','dialog-prev'])$(id).addEventListener('click',()=>moveSlide(-1));for(const id of ['next','dialog-next'])$(id).addEventListener('click',()=>moveSlide(1));
$('expand').addEventListener('click',()=>$('slide-dialog').showModal());$('close-dialog').addEventListener('click',()=>$('slide-dialog').close());
$('slide-dialog').addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();moveSlide(event.key==='ArrowLeft'?-1:1);}});
selectSample(0);paintLanguage();refreshStatus();
fetch('assets/manifest.json').then(response=>{if(!response.ok)throw new Error('assets');return response.json();}).then(manifest=>{visualAssets=manifest.assets;renderSlides();}).catch(()=>{});
