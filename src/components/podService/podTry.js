// import { IndexedFormula, Namespace, sym, graph, parse, serialize, aclDoc, Fetcher } from 'rdflib';
import { Namespace, graph, Fetcher } from 'rdflib';
const auth = require('solid-auth-client')

var session = null;

async function login(idp) {
    session = await auth.currentSession();
    if (!session)
        await auth.login(idp);
    else
        console.log(`Logged in as ${session.webId}`);
}

async function SolidThing() {
    // const store = new IndexedFormula();
    // const me = store.sym('https://fincamd.solid.community/profile/card#me');
    // const profile = me.doc();

    // const VCARD = new Namespace("http://www.w3.org/2006/vcard/ns#");
    // store.add(me, VCARD("fn"), "John Bloggs", profile);
    // let name = store.any(me, VCARD('name'), null, profile);

    // let text = '<#this>  a  <#Example> .';
    // let doc = sym("https://example.com/alice/card");
    // let store2 = graph();
    // parse(text, store2, doc.uri, "text/turtle");  // pass base URI
    // store2.toNT();
    // console.log(serialize(doc, store2, aclDoc.uri, 'text/turtle'));

    await login('https://solid.community');

    const store = graph();
    const me = store.sym(session.webId); // store.sym('https://fincamd.solid.community/profile/card#me');
    const profile = me.doc() //i.e. store.sym(''https://example.com/alice/card#me');
    const VCARD = new Namespace("http://www.w3.org/2006/vcard/ns#");

    const fetcher = new Fetcher(store);

    fetcher.load(profile).then(response => {
        let name = store.any(me, VCARD("fn"));
        console.log("Loaded {$name || 'wot no name?'}");
    }, err => {
        console.log("Load failed" + err);
    });

    const FOAF = Namespace('http://xmlns.com/foaf/0.1/');

    let name = store.any(me, VCARD("fn")) || store.any(me, FOAF("name"));
    //let picture = store.any(me, VCARD("hasPhoto")) || store.any(me, FOAF(image));

    let names = store.each(me, VCARD("fn")).concat(store.each(me, FOAF("name")));
}

export default SolidThing;