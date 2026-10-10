/*! SAP CDS highlight.js language definition */
export default function(hljs) {
  const TYPES = [
    'Binary','Boolean','DateTime','Date','DecimalFloat','Decimal','Double',
    'Int16','Int32','Int64','Integer64','Integer','LargeBinary','LargeString',
    'Number','String','Timestamp','Time','UInt8','UUID','Vector'
  ];

  const CDL_KEYWORDS = [
    'action','actions','annotation','context','define','enum','extend',
    'function','namespace','service','view','aspect','event','type','entity',
    'element','elements','column','columns','projection','facets'
  ];

  const CDL_SECONDARY = [
    'array','of','key','on','default','abstract','mixin','returns',
    'localized','virtual','masked','managed','technical','@cds','import',
    'using','from','as','to','many','one','not','null','true','false'
  ];

  const CQL_KEYWORDS = [
    'select','from','where','order','by','group','having','limit','offset',
    'union','intersect','except','join','inner','left','right','full','outer',
    'cross','exists','all','any','distinct','as','on','into','between','like',
    'in','is','not','and','or','asc','desc','case','when','then','else','end',
    'cast','count','sum','min','max','avg','first','last'
  ];

  return {
    name: 'CDS',
    aliases: ['cds'],
    case_insensitive: false,
    keywords: {
      keyword: [...CDL_KEYWORDS, ...CDL_SECONDARY, ...CQL_KEYWORDS].join(' '),
      type: TYPES.join(' '),
      literal: 'true false null'
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      // Annotations  @Foo, @Foo.Bar, @(...)
      {
        className: 'meta',
        begin: /@[\w.]+/,
        relevance: 0
      },
      // String literals (single-quoted)
      {
        className: 'string',
        begin: /'/,
        end: /'/,
        contains: [{ begin: /''/ }]
      },
      // String literals (double-quoted identifiers)
      {
        className: 'string',
        begin: /"/,
        end: /"/,
        contains: [{ begin: /""/ }]
      },
      // Backtick-quoted identifiers
      hljs.BACKSLASH_ESCAPE,
      // Numbers
      hljs.C_NUMBER_MODE,
      // Namespace/using paths  e.g. com.sap.cgt
      {
        className: 'title',
        begin: /\b[a-z][a-z0-9_]*(?:\.[a-z][a-z0-9_]*)+\b/,
        relevance: 0
      }
    ]
  };
}
