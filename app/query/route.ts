import { db } from "@vercel/postgres";

const client = await db.connect();

async function listInvoices() {
    const data = await client.sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

    return data.rows;
}

export async function GET() {
    try {
        const invoices = await listInvoices();
        return new Response(JSON.stringify(invoices), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";

        console.error("Failed to fetch invoices:", errorMessage);

        return new Response(
            JSON.stringify({ error: errorMessage }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
