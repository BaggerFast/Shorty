import { XMarkIcon } from '@heroicons/react/24/solid'
import { LinkRecordType } from '@/shared/LinkRecordType'
import QRGenerator from '@/components/LinksComponents/QRGenerator'
import LineChart from '@/components/Charts/LineChart'
import BrowserDoughnutChart from '@/components/Charts/BrowserDoghnutChart'
import LinkDetails from '@/components/LinksComponents/LinkDetails'

export default function LinkStickerBoard({
  translate,
  linkData,
  hideLink,
  reloadLinks,
  setSelectedLink
}: {
  translate: { [_: string]: string }
  linkData: LinkRecordType
  hideLink: () => void
  reloadLinks: () => void
  setSelectedLink: (link: LinkRecordType) => void
}) {
  const shortURL = `http://localhost:3031/${linkData.refRoute}`
  const browserChartData = [
    { label: 'Chrome', value: 45 },
    { label: 'Firefox', value: 30 },
    { label: 'Safari', value: 10 },
    { label: 'Edge', value: 8 },
    { label: 'Other', value: 7 }
  ]
  const lineChartData = [100, 200, 150, 300, 250, 400, 350]
  const lineChartLabels = [
    '01.01.23',
    '02.01.23',
    '03.01.23',
    '04.01.23',
    '05.01.23',
    '06.01.23',
    '07.01.23'
  ]
  return (
    <>
      <div className="sticky flex h-16 w-full items-center justify-between bg-white px-6 shadow-[0px_8px_10px_0px_rgba(0,0,0,0.05)] dark:bg-[#23212e] dark:shadow-[0px_8px_10px_0px_rgba(0,0,0,0.1)] sm:hidden">
        <p className="line-clamp-1 text-lg font-bold ">
          {translate.windowTitle}
        </p>
        <button type="button" onClick={hideLink}>
          <XMarkIcon className="h-6 w-6 dark:text-white" />
        </button>
      </div>
      <div className="m-auto flex max-w-7xl flex-wrap gap-4 bg-[#eef1f6] p-3 dark:bg-[#1c1a25] min-[640px]:bg-transparent md:p-6">
        <div className="h-[232px] w-full max-w-2xl rounded-xl bg-white px-4 py-2 dark:bg-[#23212e] md:px-10 md:py-6">
          <LinkDetails
            translate={translate}
            linkData={linkData}
            hideLink={hideLink}
            reloadLinks={reloadLinks}
            setSelectedLink={(link: LinkRecordType) => setSelectedLink(link)}
          />
        </div>
        <div className="rounded-xl bg-white p-4 dark:bg-[#23212e] sm:h-fit">
          <div className="h-[200px] w-[200px]">
            <QRGenerator hrefLink={shortURL} />
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 dark:bg-[#23212e]">
          <div className="h-[200px] w-[200px]">
            <BrowserDoughnutChart data={browserChartData} />
          </div>
        </div>
        <div className="w-full max-w-[392px] rounded-xl bg-white p-4 dark:bg-[#23212e]">
          <div className="h-[200px] w-full max-w-[392px]">
            <LineChart data={lineChartData} labels={lineChartLabels} />
          </div>
        </div>
      </div>
    </>
  )
}
