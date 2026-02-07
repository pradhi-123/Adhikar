const situation1 = "The shopkeeper sold me expired milk and refuses to refund.";
const situation2 = "My husband hits me every day after drinking.";

async function testSituation(sit) {
    console.log(`\nTesting: "${sit}"`);
    const res = await fetch("http://localhost:3000/api/analyze-situation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation: sit, language: "en" })
    });
    const data = await res.json();
    console.log("Laws Recommeded:", data.relevantLaws.map(l => l.id));
}

async function run() {
    await testSituation(situation1);
    await testSituation(situation2);
}

run();
