// rank-config.js

// ============================================
// DEVELOPER ACCOUNTS
// ============================================

export const DEVELOPER_UIDS = [
    'DWYqljRPo0QLUPKf5gAKuLOG8QA2'
];


// ============================================
// MEMBER ACCOUNTS
// ============================================
//
// Add Firebase UIDs here.
//
// Anyone NOT in this list and NOT in the
// developer list automatically becomes User.
//

export const MEMBER_UIDS = [
    // 'firebase_uid_here',
    // 'another_firebase_uid_here'
];


// ============================================
// GET USER RANK
// ============================================

export function getUserRank(uid) {
    if (!uid) {
        return 'user';
    }

    if (DEVELOPER_UIDS.includes(uid)) {
        return 'developer';
    }

    if (MEMBER_UIDS.includes(uid)) {
        return 'member';
    }

    return 'user';
}


// ============================================
// RANK DISPLAY NAME
// ============================================

export function getRankLabel(rank) {
    switch (rank) {
        case 'developer':
            return 'Developer';

        case 'member':
            return 'Member';

        case 'user':
        default:
            return 'User';
    }
}
