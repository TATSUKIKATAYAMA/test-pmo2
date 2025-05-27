import Link from "next/link";
import { client } from "@/libs/microcms";

export const revalidate = 60; //

type News = {
  id: string;
  title: string;
  publishedAt: string;
};

export const metadata = {
  title: "ニュース一覧 | サイト名",
  description: "当サイトのお知らせ・更新情報を一覧でご確認いただけます。",
  openGraph: {
    title: "ニュース一覧 | サイト名",
    description: "新サービスのリリース、キャンペーン、メンテナンス情報などを随時発信しています。",
  },
};

export default async function NewsListPage() {
  const data = await client.getList<News>({ endpoint: "news" });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">ニュース一覧</h1>
      <ul className="space-y-2">
        {data.contents.map((news) => (
          <li key={news.id}>
            <Link href={`/news/${news.id}`} className="text-blue-600 underline">
              {news.title}
            </Link>
            <div className="text-sm text-gray-500">
              {new Date(news.publishedAt).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
