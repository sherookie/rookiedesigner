import HTMLFlipBook from 'react-pageflip'

// 這是一個簡單的翻頁書模組
export default function BookPlayer({ pages }) {
  return (
    // width 和 height 是單頁的比例 (例如 400x400 的正方形)
    // showCover={true} 讓第一頁變成封面 (只顯示右半邊)
    <HTMLFlipBook 
      width={400} 
      height={400} 
      size="stretch" 
      minWidth={200} 
      maxWidth={800} 
      minHeight={200} 
      maxHeight={800} 
      showCover={true}
      className="my-flip-book"
      style={{ margin: '0 auto', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
    >
      {pages.map((imgSrc, index) => (
        <div className="book-page" key={index}>
          <img 
            src={imgSrc} 
            alt={`Page ${index + 1}`} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      ))}
    </HTMLFlipBook>
  )
}